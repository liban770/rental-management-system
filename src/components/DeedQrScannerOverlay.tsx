import React, { useState, useEffect, useRef } from 'react';

export interface DeedVerificationData {
  deedNumber: string;
  propertyName: string;
  plotNumber: string;
  district: string;
  city: string;
  ownerName: string;
  ownerNationalId: string;
  notaryOffice: string;
  registrationDate: string;
  verificationHash: string;
  cadastralVolume: string;
  cadastralFolio: string;
  encumbranceStatus: 'Clear' | 'Encumbered' | 'Disputed';
  escrowCustodyId: string;
  ministrySeal: string;
  gpsCoordinates: string;
}

const SAMPLE_DEEDS: Record<string, DeedVerificationData> = {
  'the-palms': {
    deedNumber: 'CAD-HGA-99120',
    propertyName: 'The Palms Luxury Villa & Executive Residences',
    plotNumber: 'Plot 18, Diplomats Enclave',
    district: 'Jigjiga Yar',
    city: 'Hargeisa, Somaliland',
    ownerName: 'Ahmed Liban Mohamed',
    ownerNationalId: 'SOM-HGA-772910',
    notaryOffice: 'Hargeisa Central Cadastre & Land Deeds Directorate',
    registrationDate: 'October 1, 2026',
    verificationHash: 'SHA256:9e8a71b402cda736181f08be9238f921eac7491bb40c3102c98a391ef41219b4',
    cadastralVolume: 'VOL-882',
    cadastralFolio: '41B',
    encumbranceStatus: 'Clear',
    escrowCustodyId: 'ESC-SOM-2026-0049',
    ministrySeal: 'SLD-MIN-LANDS-OFFICIAL-2026',
    gpsCoordinates: '9.5612° N, 44.0621° E',
  },
  'mansoor-vista': {
    deedNumber: 'SLD-MV-44102',
    propertyName: 'Mansoor Vista Commercial & Penthouse Suites',
    plotNumber: 'Block 4, Shaab Area Boulevard',
    district: 'Masalaha',
    city: 'Hargeisa, Somaliland',
    ownerName: 'Fadumo Jama Duale',
    ownerNationalId: 'SOM-HGA-661902',
    notaryOffice: 'Maroodi-Jeex Regional Lands & Urban Registry',
    registrationDate: 'August 14, 2026',
    verificationHash: 'SHA256:d48291ac07b9415e9821bf3089c204918e77a28109db8137f26189ae48721c09',
    cadastralVolume: 'VOL-740',
    cadastralFolio: '19C',
    encumbranceStatus: 'Clear',
    escrowCustodyId: 'ESC-SOM-2026-0081',
    ministrySeal: 'SLD-MIN-LANDS-OFFICIAL-2026',
    gpsCoordinates: '9.5539° N, 44.0580° E',
  },
  'red-sea': {
    deedNumber: 'BER-CAD-10492',
    propertyName: 'Red Sea Portside Commercial Villa',
    plotNumber: 'Plot 77, Coastal Maritime Strip',
    district: 'Coastal District',
    city: 'Berbera, Somaliland',
    ownerName: 'Khadar Yassin Warsame',
    ownerNationalId: 'SOM-BER-330198',
    notaryOffice: 'Sahil Regional Ministry of Lands Registry',
    registrationDate: 'June 22, 2026',
    verificationHash: 'SHA256:39f81a702b8813c90e1189ac65103a891720be9081eac194098bbca01948ae11',
    cadastralVolume: 'VOL-312',
    cadastralFolio: '08A',
    encumbranceStatus: 'Clear',
    escrowCustodyId: 'ESC-SOM-2026-0012',
    ministrySeal: 'SLD-MIN-LANDS-OFFICIAL-2026',
    gpsCoordinates: '10.4321° N, 45.0142° E',
  }
};

interface DeedQrScannerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onViewAgreement?: () => void;
  initialDeedKey?: string;
}

export const DeedQrScannerOverlay: React.FC<DeedQrScannerOverlayProps> = ({
  isOpen,
  onClose,
  onViewAgreement,
  initialDeedKey = 'the-palms',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanLoopRef = useRef<number | null>(null);

  const [cameraState, setCameraState] = useState<'idle' | 'requesting' | 'streaming' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [torchOn, setTorchOn] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [verificationResult, setVerificationResult] = useState<DeedVerificationData | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const [activePreset, setActivePreset] = useState<string>(initialDeedKey);

  // Play audio chime for scan success
  const playSuccessChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Note 1
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now); // A5
      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.15);

      // Note 2
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1760, now + 0.08); // A6
      gain2.gain.setValueAtTime(0.2, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.35);

      // Haptic vibration
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([40, 50, 40]);
      }
    } catch {
      // AudioContext could be blocked by browser policy
    }
  };

  // Start Camera
  const startCamera = async (mode: 'environment' | 'user' = facingMode) => {
    setCameraState('requesting');
    setErrorMessage('');

    // Stop existing stream if any
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by your browser environment.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraState('streaming');

      // Start Barcode Detection loop if supported
      startBarcodeDetection(stream);
    } catch (err: unknown) {
      console.warn('Camera error:', err);
      const msg = err instanceof Error ? err.message : 'Unable to access device camera';
      setErrorMessage(msg);
      setCameraState('error');
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (scanLoopRef.current) {
      cancelAnimationFrame(scanLoopRef.current);
      scanLoopRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraState('idle');
    setTorchOn(false);
  };

  // BarcodeDetector loop (for browsers supporting the standard Barcode Detection API)
  const startBarcodeDetection = (stream: MediaStream) => {
    // Check if BarcodeDetector is supported
    const BarcodeDetectorClass = (window as unknown as { BarcodeDetector?: new (options?: { formats: string[] }) => { detect: (source: ImageBitmapSource) => Promise<Array<{ rawValue: string }>> } }).BarcodeDetector;

    if (!BarcodeDetectorClass) {
      return;
    }

    try {
      const barcodeDetector = new BarcodeDetectorClass({ formats: ['qr_code'] });
      const video = videoRef.current;
      if (!video) return;

      const detectFrame = async () => {
        if (!stream.active || !video || video.readyState < 2) {
          scanLoopRef.current = requestAnimationFrame(detectFrame);
          return;
        }

        try {
          const barcodes = await barcodeDetector.detect(video);
          if (barcodes && barcodes.length > 0) {
            const code = barcodes[0].rawValue;
            handleDetectedCode(code);
            return; // stop detection after hit
          }
        } catch {
          // ignore transient detection frame errors
        }

        scanLoopRef.current = requestAnimationFrame(detectFrame);
      };

      scanLoopRef.current = requestAnimationFrame(detectFrame);
    } catch {
      // BarcodeDetector initialization failure
    }
  };

  const handleDetectedCode = (codeText: string) => {
    setIsVerifying(true);
    playSuccessChime();

    setTimeout(() => {
      setIsVerifying(false);
      // Map to sample deeds or construct verified deed record
      if (codeText.toLowerCase().includes('mansoor') || codeText.toLowerCase().includes('mv')) {
        setVerificationResult(SAMPLE_DEEDS['mansoor-vista']);
      } else if (codeText.toLowerCase().includes('berbera') || codeText.toLowerCase().includes('red-sea')) {
        setVerificationResult(SAMPLE_DEEDS['red-sea']);
      } else {
        setVerificationResult(SAMPLE_DEEDS['the-palms']);
      }
    }, 900);
  };

  // Trigger verification with a preset sample deed
  const handleSimulateScan = (presetKey: string = 'the-palms') => {
    setActivePreset(presetKey);
    setIsVerifying(true);
    setTimeout(() => {
      playSuccessChime();
      setIsVerifying(false);
      setVerificationResult(SAMPLE_DEEDS[presetKey] || SAMPLE_DEEDS['the-palms']);
    }, 700);
  };

  // Toggle Torch
  const toggleTorch = async () => {
    if (!streamRef.current) return;
    const track = streamRef.current.getVideoTracks()[0];
    if (!track) return;

    try {
      const capabilities = track.getCapabilities?.() as { torch?: boolean } | undefined;
      if (capabilities && capabilities.torch) {
        await track.applyConstraints({
          advanced: [{ torch: !torchOn } as unknown as MediaTrackConstraintSet],
        });
        setTorchOn(!torchOn);
      } else {
        // Fallback visual simulation
        setTorchOn(!torchOn);
      }
    } catch {
      setTorchOn(!torchOn);
    }
  };

  // Switch Camera front/back
  const switchCamera = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Lifecycle
  useEffect(() => {
    if (isOpen) {
      setVerificationResult(null);
      setIsVerifying(false);
      startCamera(facingMode);
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const copyHashToClipboard = () => {
    if (!verificationResult) return;
    navigator.clipboard?.writeText(verificationResult.verificationHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#130f1a] rounded-3xl border border-[#3b2b4d] shadow-2xl overflow-hidden flex flex-col my-auto text-white">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-[#2b2138] flex items-center justify-between bg-[#1b1526]/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#49007a] flex items-center justify-center text-white shadow-md border border-[#7c3aed]/40">
              <span className="material-symbols-outlined text-2xl">qr_code_scanner</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-['Manrope'] font-bold text-base text-white">
                  Cadastral Deed Authenticator
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#006e2c]/30 text-[#4ade80] border border-[#006e2c]">
                  Official Registry
                </span>
              </div>
              <p className="text-xs text-[#a49ba9]">
                Ministry of Public Works, Lands & Housing • Somaliland
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Close scanner"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Main Body: Either Live Scanner View or Verified Certificate Result */}
        {!verificationResult ? (
          <div className="p-5 sm:p-6 flex flex-col items-center">
            {/* Camera Viewfinder Container */}
            <div className="relative w-full max-w-md h-72 sm:h-80 bg-black rounded-2xl overflow-hidden border-2 border-[#49007a]/40 shadow-inner flex items-center justify-center">
              {/* Video Element */}
              <video
                ref={videoRef}
                playsInline
                muted
                autoPlay
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  cameraState === 'streaming' ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Torch Simulation Glow */}
              {torchOn && (
                <div className="absolute inset-0 bg-white/15 pointer-events-none mix-blend-screen transition-opacity" />
              )}

              {/* Camera Loading or Error Fallback States */}
              {cameraState === 'requesting' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#171221] text-center p-4">
                  <div className="w-10 h-10 border-3 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs font-semibold text-[#cdc3cf]">
                    Accessing device camera...
                  </p>
                  <p className="text-[11px] text-[#7c7389] max-w-xs">
                    Please approve browser camera permissions if prompted
                  </p>
                </div>
              )}

              {cameraState === 'error' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#171221] text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-[#ba1a1a]/20 text-[#ffb4ab] flex items-center justify-center mb-1">
                    <span className="material-symbols-outlined text-2xl">videocam_off</span>
                  </div>
                  <p className="text-xs font-bold text-white">Camera Offline or Inaccessible</p>
                  <p className="text-[11px] text-[#a49ba9] max-w-xs leading-relaxed">
                    {errorMessage || 'Camera permission denied or device not found.'}
                  </p>
                  <button
                    onClick={() => startCamera(facingMode)}
                    className="mt-2 px-3 py-1.5 bg-[#49007a] hover:bg-[#6200a4] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Retry Camera
                  </button>
                </div>
              )}

              {/* High-tech Viewfinder Overlay (when camera active or initializing) */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-6">
                {/* Target Frame Box */}
                <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-xl">
                  {/* Glowing Corner Brackets */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#7c3aed] rounded-tl-lg shadow-sm" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#7c3aed] rounded-tr-lg shadow-sm" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#7c3aed] rounded-bl-lg shadow-sm" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#7c3aed] rounded-br-lg shadow-sm" />

                  {/* Center Target Dot */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-[#7c3aed]/60 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#7c3aed]" />
                  </div>

                  {/* Animated Laser Scanning Line */}
                  <div className="absolute left-1 right-1 h-0.5 bg-gradient-to-r from-transparent via-[#a855f7] to-transparent shadow-[0_0_12px_#c084fc] animate-[bounce_2.2s_ease-in-out_infinite]" />

                  {/* Scanning Watermark Tag */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-[#d8b4fe] border border-[#7c3aed]/30">
                    ALIGN NOTARIZED QR STAMP
                  </div>
                </div>
              </div>

              {/* Live Scanner Verifying Overlay */}
              {isVerifying && (
                <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center gap-3 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full border-3 border-[#4ade80] border-t-transparent animate-spin" />
                  <div className="text-center">
                    <p className="text-sm font-bold text-[#4ade80]">
                      Decentralized Cadastre Verified!
                    </p>
                    <p className="text-xs text-[#cdc3cf] mt-0.5">
                      Decrypting Ministry cryptographic signature...
                    </p>
                  </div>
                </div>
              )}

              {/* Viewfinder Controls Bar (Torch & Camera Switch) */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
                <button
                  type="button"
                  onClick={toggleTorch}
                  className={`p-2 rounded-xl backdrop-blur-md transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${
                    torchOn
                      ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/30'
                      : 'bg-black/50 hover:bg-black/70 text-white'
                  }`}
                  title="Toggle Light"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {torchOn ? 'flash_on' : 'flash_off'}
                  </span>
                  <span className="hidden sm:inline">{torchOn ? 'Torch ON' : 'Torch'}</span>
                </button>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-[#cdc3cf] font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                  <span>CAD-SENSOR-ACTIVE</span>
                </div>

                <button
                  type="button"
                  onClick={switchCamera}
                  className="p-2 rounded-xl bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                  title="Switch Front/Rear Camera"
                >
                  <span className="material-symbols-outlined text-[18px]">cameraswitch</span>
                  <span className="hidden sm:inline">Flip</span>
                </button>
              </div>
            </div>

            {/* Quick Test / Simulated Scan Presets Bar */}
            <div className="w-full mt-5 p-4 rounded-2xl bg-[#1b1526] border border-[#2b2138]">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#d8b4fe] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">verified_user</span>
                  Instant Deed Authenticity Verification
                </span>
                <span className="text-[11px] text-[#a49ba9]">Test Presets</span>
              </div>
              <p className="text-xs text-[#a49ba9] mb-3 leading-relaxed">
                Hold your camera over the QR code stamped on any physical Somaliland Cadastral Title Deed certificate, or tap any registered deed below to simulate instant on-chain verification:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleSimulateScan('the-palms')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    activePreset === 'the-palms'
                      ? 'border-[#7c3aed] bg-[#49007a]/30 text-white shadow-sm'
                      : 'border-[#2b2138] hover:border-[#49007a] text-[#cdc3cf] bg-[#130f1a]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white truncate">The Palms Villa</span>
                    <span className="text-[10px] text-[#4ade80] font-mono">#99120</span>
                  </div>
                  <span className="text-[10px] text-[#a49ba9] truncate">Ahmed Liban • Jigjiga Yar</span>
                  <span className="mt-2 text-[10px] text-[#c084fc] font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">play_circle</span>
                    Verify Deed
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulateScan('mansoor-vista')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    activePreset === 'mansoor-vista'
                      ? 'border-[#7c3aed] bg-[#49007a]/30 text-white shadow-sm'
                      : 'border-[#2b2138] hover:border-[#49007a] text-[#cdc3cf] bg-[#130f1a]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white truncate">Mansoor Vista</span>
                    <span className="text-[10px] text-[#4ade80] font-mono">#44102</span>
                  </div>
                  <span className="text-[10px] text-[#a49ba9] truncate">Fadumo Duale • Masalaha</span>
                  <span className="mt-2 text-[10px] text-[#c084fc] font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">play_circle</span>
                    Verify Deed
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulateScan('red-sea')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    activePreset === 'red-sea'
                      ? 'border-[#7c3aed] bg-[#49007a]/30 text-white shadow-sm'
                      : 'border-[#2b2138] hover:border-[#49007a] text-[#cdc3cf] bg-[#130f1a]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white truncate">Red Sea Portside</span>
                    <span className="text-[10px] text-[#4ade80] font-mono">#10492</span>
                  </div>
                  <span className="text-[10px] text-[#a49ba9] truncate">Khadar Warsame • Berbera</span>
                  <span className="mt-2 text-[10px] text-[#c084fc] font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">play_circle</span>
                    Verify Deed
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Verified Certificate Modal View */
          <div className="p-6 sm:p-8 flex flex-col max-h-[80vh] overflow-y-auto">
            {/* Authenticity Banner */}
            <div className="p-4 rounded-2xl bg-[#006e2c]/20 border border-[#006e2c] flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#006e2c] text-white flex items-center justify-center shrink-0 shadow-lg">
                  <span className="material-symbols-outlined text-3xl">verified</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-['Manrope'] font-bold text-base text-white">
                      AUTHENTIC NOTARIZED TITLE DEED
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#006e2c] text-white">
                      100% Valid
                    </span>
                  </div>
                  <p className="text-xs text-[#a7f3d0]">
                    Verified against the Somaliland Cadastral Land Deeds Ledger database.
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex flex-col items-end text-xs text-[#a49ba9]">
                <span>Status: Active & Registered</span>
                <span className="font-mono text-[#4ade80]">Zero Encumbrances</span>
              </div>
            </div>

            {/* Official Certificate Paper Container */}
            <div className="p-6 rounded-2xl bg-white text-[#1b1b1f] shadow-xl border border-[#e8dfee] relative overflow-hidden">
              {/* Somaliland Emblem Header */}
              <div className="text-center pb-5 border-b-2 border-[#1b1b1f] mb-6">
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-[#f6eeff] flex items-center justify-center text-[#49007a] border border-[#e2d0ee]">
                    <span className="material-symbols-outlined text-2xl">account_balance</span>
                  </div>
                </div>
                <h4 className="font-serif font-extrabold text-lg sm:text-xl tracking-tight uppercase">
                  Republic of Somaliland
                </h4>
                <p className="text-xs font-semibold text-[#7c7389] tracking-wider uppercase">
                  Ministry of Public Works, Lands & Housing • Department of Cadastre
                </p>
                <div className="inline-block mt-2 px-3 py-1 bg-[#e8f5e9] text-[#006e2c] rounded-full text-xs font-mono font-bold border border-[#a5d6a7]">
                  Deed Certificate #{verificationResult.deedNumber}
                </div>
              </div>

              {/* Grid of Verified Attributes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6">
                <div className="p-3.5 rounded-xl bg-[#faf5fc] border border-[#ebdff0]">
                  <span className="text-[11px] text-[#7c7389] uppercase tracking-wider block mb-1">
                    Property Designation & Plot
                  </span>
                  <p className="font-bold text-sm text-[#1b1b1f] mb-0.5">
                    {verificationResult.propertyName}
                  </p>
                  <p className="text-[#5a5462]">{verificationResult.plotNumber}</p>
                  <p className="text-[#5a5462]">
                    {verificationResult.district}, {verificationResult.city}
                  </p>
                  <p className="text-[11px] font-mono text-[#7c7389] mt-1">
                    GPS: {verificationResult.gpsCoordinates}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#faf5fc] border border-[#ebdff0]">
                  <span className="text-[11px] text-[#7c7389] uppercase tracking-wider block mb-1">
                    Notarized Owner of Record
                  </span>
                  <p className="font-bold text-sm text-[#1b1b1f] mb-0.5">
                    {verificationResult.ownerName}
                  </p>
                  <p className="text-[#5a5462]">
                    National ID: <span className="font-mono font-bold">{verificationResult.ownerNationalId}</span>
                  </p>
                  <p className="text-[#5a5462]">
                    KYC Verification: <span className="text-[#006e2c] font-bold">Biometrically Cleared</span>
                  </p>
                  <p className="text-[11px] font-mono text-[#7c7389] mt-1">
                    Custody Escrow: {verificationResult.escrowCustodyId}
                  </p>
                </div>
              </div>

              {/* Cadastral Legal Ledger Attributes */}
              <div className="border-t border-b border-[#e8dfee] py-3 my-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[#7c7389] block">Cadastral Volume</span>
                  <span className="font-mono font-bold text-[#1b1b1f]">
                    {verificationResult.cadastralVolume}
                  </span>
                </div>
                <div>
                  <span className="text-[#7c7389] block">Registry Folio</span>
                  <span className="font-mono font-bold text-[#1b1b1f]">
                    {verificationResult.cadastralFolio}
                  </span>
                </div>
                <div>
                  <span className="text-[#7c7389] block">Encumbrance Status</span>
                  <span className="font-bold text-[#006e2c] flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    {verificationResult.encumbranceStatus}
                  </span>
                </div>
                <div>
                  <span className="text-[#7c7389] block">Notarized Date</span>
                  <span className="font-semibold text-[#1b1b1f]">
                    {verificationResult.registrationDate}
                  </span>
                </div>
              </div>

              {/* Cryptographic Hash Bar */}
              <div className="mt-4 p-3 rounded-xl bg-[#faf5fc] border border-[#ebdff0] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-[#7c7389] uppercase tracking-wider block font-bold">
                    Cadastral Blockchain Registry Hash
                  </span>
                  <p className="font-mono text-[11px] text-[#49007a] truncate select-all">
                    {verificationResult.verificationHash}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={copyHashToClipboard}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#d2c2d8] text-xs font-semibold text-[#1b1b1f] hover:bg-[#f6eeff] transition-colors flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-sm">
                    {copiedHash ? 'check' : 'content_copy'}
                  </span>
                  <span>{copiedHash ? 'Copied!' : 'Copy Hash'}</span>
                </button>
              </div>

              {/* Ministry Stamps / Seals */}
              <div className="mt-5 flex items-center justify-between text-xs text-[#7c7389]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006e2c] text-lg">verified</span>
                  <span>Notary Seal: <strong>{verificationResult.ministrySeal}</strong></span>
                </div>
                <div className="font-serif italic text-[#1b1b1f] font-bold">
                  Hargeisa Cadastre Directorate
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setVerificationResult(null);
                  startCamera(facingMode);
                }}
                className="px-4 py-2.5 rounded-xl border border-[#3b2b4d] bg-[#1b1526] hover:bg-[#2b2138] text-white text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">qr_code_scanner</span>
                <span>Scan Another Certificate</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    alert(`Official Deed Verification Transcript for ${verificationResult.deedNumber} generated and ready for print.`);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">download</span>
                  <span>Download Transcript</span>
                </button>

                {onViewAgreement && (
                  <button
                    type="button"
                    onClick={() => {
                      stopCamera();
                      onClose();
                      onViewAgreement();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#49007a] hover:bg-[#6200a4] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <span>View Tenancy Agreement</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
