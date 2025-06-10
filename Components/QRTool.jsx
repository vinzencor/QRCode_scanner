'use client'
import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QRReader } from '@blackbox-vision/react-qr-reader';

function QRTool() {
    const [text, setText] = useState('');
    const [scanResult, setScanResult] = useState('');
    const [showScanner, setShowScanner] = useState(false);

    // const handleScan = (data) => {
    //     if (data) {
    //         setScanResult(data);
    //         setShowScanner(false); // Close scanner after successful scan
    //     }
    // };

    const handleError = (err) => {
        console.error('QR Scan Error:', err);
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>QR Code Generator & Scanner</h2>

            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to generate QR"
                style={{ padding: '10px', fontSize: '16px', width: '250px' }}
            />
            <div style={{ margin: '20px', display: 'flex', justifyContent: 'center' }}>
                <QRCodeSVG value={text || ' '} />
            </div>

            <button onClick={() => setShowScanner(!showScanner)} style={{ padding: '10px 20px' }}>
                {showScanner ? 'Close Scanner' : 'Open Camera to Scan QR'}
            </button>

            {showScanner && (
                <div style={{ marginTop: '20px' }}>
                    <QRReader
                        onResult={(result, error) => {
                            if (!!result) {
                                setScanResult(result?.text);
                                setShowScanner(false);
                            }
                            if (!!error) {
                                console.error('QR Scan Error:', error);
                            }
                        }}
                        constraints={{ facingMode: 'environment' }}
                        containerStyle={{ width: '300px', margin: 'auto' }}
                    />
                </div>
            )}

            {scanResult && (
                <div style={{ marginTop: '20px' }}>
                    <strong>Scanned Data:</strong> {scanResult}
                </div>
            )}
        </div>
    );
}

export default QRTool;
