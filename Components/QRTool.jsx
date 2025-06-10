'use client'
import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrReader } from 'react-qr-reader';


const QRCodeTool = () => {
    const [text, setText] = useState('');
    const [showScanner, setShowScanner] = useState(false);
    const [scanResult, setScanResult] = useState('');

    const handleScan = (data) => {
        if (data) setScanResult(data);
    };

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <div>
            <div style={styles.container}>
            <h2 style={styles.title}>QR Code Generator & Scanner</h2>

            <div style={styles.card}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text to generate QR"
                    style={styles.input}
                />

                <div style={styles.qrWrapper}>
                    <QRCodeSVG value={text || ' '} size={200} />
                </div>

                <button onClick={() => setShowScanner(!showScanner)} style={styles.button}>
                    {showScanner ? 'Close Scanner' : 'Open Camera to Scan QR'}
                </button>

                {showScanner && (
                    <div style={styles.scannerWrapper}>
                        <QrReader
                            constraints={{ facingMode: 'environment' }}
                            scanDelay={300}
                            onResult={(result, error) => {
                                if (result) handleScan(result?.text);
                                if (error) handleError(error);
                            }}
                            style={{ width: '100%' }}
                        />
                    </div>
                )}

                {scanResult && (
                    <div style={styles.result}>
                        <strong>Scanned Data:</strong> <span>{scanResult}</span>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '60px 20px',
        backgroundColor: '#f4f4f4',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        marginBottom: '40px',
    },
    card: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
    },
    input: {
        padding: '15px',
        fontSize: '16px',
        width: '100%',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '6px',
    },
    qrWrapper: {
        marginBottom: '20px',
    },
    button: {
        padding: '12px 25px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    scannerWrapper: {
        marginTop: '20px',
        width: '100%',
    },
    result: {
        marginTop: '20px',
        textAlign: 'left',
        wordBreak: 'break-word',
        fontSize: '14px',
    },
};

export default QRCodeTool;
