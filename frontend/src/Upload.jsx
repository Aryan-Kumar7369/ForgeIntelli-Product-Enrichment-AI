import { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, File, CheckCircle, Loader2 } from 'lucide-react';
import Navbar from './components/Navbar';
import ScrollReveal from './components/ScrollReveal';
import { Link } from 'react-router-dom';

export default function Upload() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    setFile(selectedFile);
    processFile();
  };

  const processFile = () => {
    setIsProcessing(true);
    // Mock FastAPI connection delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 3000);
  };

  return (
    <>
      <Navbar />
      <section className="section section--void" style={{ minHeight: '100vh', paddingTop: '8rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <ScrollReveal>
            <p className="section__label">Ingest</p>
            <h1 className="section__title">Upload Data</h1>
            <p className="section__desc" style={{ marginBottom: '2rem' }}>
              Drop your industrial PDFs, images, or spreadsheets to extract structured product data.
            </p>
          </ScrollReveal>

          {!file ? (
            <motion.div
              className={`upload-zone ${dragActive ? 'upload-zone--active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${dragActive ? 'var(--brand-primary)' : 'var(--text-ghost)'}`,
                borderRadius: '4px',
                padding: '4rem 2rem',
                textAlign: 'center',
                background: dragActive ? 'var(--glow-primary)' : 'var(--bg-surface)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input 
                id="file-upload" 
                type="file" 
                multiple={false} 
                onChange={handleChange} 
                style={{ display: 'none' }} 
              />
              <UploadCloud size={48} color={dragActive ? 'var(--brand-primary)' : 'var(--text-ghost)'} style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Drag and drop files here</h3>
              <p style={{ color: 'var(--text-muted)' }}>or click to browse from your computer</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--text-ghost)',
                borderRadius: '4px',
                padding: '2rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <File size={32} color="var(--brand-primary)" />
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: 'var(--text-primary)', margin: 0 }}>{file.name}</h4>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                {isProcessing && <Loader2 size={24} className="spin" color="var(--brand-primary)" />}
                {isComplete && <CheckCircle size={24} color="var(--success)" />}
              </div>

              {isProcessing && (
                <div>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Extracting features via AI...</p>
                  <div style={{ width: '100%', height: '4px', background: 'var(--bg-deep)', borderRadius: '2px', overflow: 'hidden' }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3, ease: 'linear' }}
                      style={{ height: '100%', background: 'var(--brand-primary)' }}
                    />
                  </div>
                </div>
              )}

              {isComplete && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p style={{ color: 'var(--success)', marginBottom: '1rem' }}>Extraction complete!</p>
                  <Link to="/catalog" style={{ 
                    display: 'inline-block',
                    padding: '0.5rem 1rem', 
                    background: 'var(--brand-primary)', 
                    color: 'var(--bg-void)',
                    borderRadius: '2px',
                    textDecoration: 'none',
                    fontWeight: 600
                  }}>View in Catalog</Link>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </section>
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
