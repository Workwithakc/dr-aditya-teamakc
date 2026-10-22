import { useState } from 'react';
import { Play, Plus, ArrowUpRight, Instagram, Video, Image, Check, Sparkles, MapPin } from 'lucide-react';
import { Reveal, Chapter } from './Shared';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { instagramProfile, instagramMediaGallery } from '../data/practice';

export default function InstagramGallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedMedia, setSelectedMedia] = useState(null);

  const categories = [
    'All',
    'Videos & Masterclasses',
    'Fetal Medicine',
    'High-Risk Obstetrics',
    'Fertility & IVF',
    'Gynaecological Surgery'
  ];

  const filteredMedia = instagramMediaGallery.filter(item => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Videos & Masterclasses') return item.type === 'video';
    return item.category === activeCategory;
  });

  return (
    <section className="section-padding container instagram-gallery-section" id="insta-gallery" data-testid="instagram-gallery-section">
      <Reveal>
        <Chapter number="05">CLINICAL MEDIA & PATIENT EDUCATION</Chapter>
        <div className="section-head instagram-section-head">
          <div>
            <h2 className="display-heading" data-testid="instagram-gallery-heading">
              Behind the science.<br />
              <em>Inside the practice.</em>
            </h2>
            <p className="body-copy">
              Explore authentic surgical cases, 3D fetal sonography, reproductive laboratory protocols, and resident masterclasses shared on Instagram by Dr. Aditya Nimbkar.
            </p>
          </div>
          <a
            href={instagramProfile.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="instagram-follow-cta"
            data-testid="instagram-follow-header-btn"
          >
            <div className="instagram-cta-icon">
              <Instagram size={20} />
            </div>
            <div className="instagram-cta-text">
              <span className="cta-small">Follow on Instagram</span>
              <strong>{instagramProfile.handle}</strong>
            </div>
            <ArrowUpRight size={18} />
          </a>
        </div>

        {/* INSTAGRAM BIO STRIP */}
        <div className="instagram-profile-card" data-testid="instagram-profile-card">
          <div className="instagram-avatar-wrap">
            <div className="instagram-avatar-ring">
              <img
                src={instagramProfile.avatar}
                alt={instagramProfile.name}
                className="instagram-avatar-img"
              />
            </div>
            <span className="instagram-live-badge"><Instagram size={12} /></span>
          </div>

          <div className="instagram-profile-info">
            <div className="instagram-handle-row">
              <h3 className="instagram-handle-title">{instagramProfile.handle}</h3>
              <span className="instagram-verified-badge" title="Verified Specialist">
                <Check size={11} strokeWidth={3} />
              </span>
              <span className="instagram-faculty-pill">Faculty @ Conceptual OBG</span>
            </div>
            <p className="instagram-profile-bio">{instagramProfile.bio}</p>
            <div className="instagram-profile-pills">
              <span><Sparkles size={12} /> {instagramProfile.specialties}</span>
              <span><MapPin size={12} /> {instagramProfile.cities}</span>
            </div>
          </div>

          <div className="instagram-profile-action">
            <a
              href={instagramProfile.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="pill-button instagram-pill-btn"
              data-testid="instagram-profile-action-btn"
            >
              <Instagram size={16} />
              <span>Follow @dradityanimbkar</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="gallery-filter-bar" role="tablist" aria-label="Filter media gallery">
          {categories.map(cat => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`filter-chip ${activeCategory === cat ? 'selected' : ''}`}
              onClick={() => setActiveCategory(cat)}
              data-testid={`gallery-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              {cat === 'Videos & Masterclasses' && <Video size={13} />}
              {cat !== 'Videos & Masterclasses' && cat !== 'All' && <Image size={13} />}
              <span>{cat}</span>
              {cat === 'Videos & Masterclasses' && <span className="cat-counter">5</span>}
            </button>
          ))}
        </div>
      </Reveal>

      {/* MEDIA GRID */}
      <div className="instagram-media-grid" data-testid="instagram-media-grid">
        {filteredMedia.map((item, idx) => (
          <Reveal
            key={item.id}
            delay={(idx % 6) * 0.06}
            className={`instagram-media-wrapper ${item.type === 'video' ? 'is-video-card' : ''}`}
          >
            <div
              className={`instagram-media-card ${item.type === 'video' ? 'card-video' : 'card-photo'}`}
              onClick={() => setSelectedMedia(item)}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedMedia(item);
                }
              }}
              data-testid={`media-card-${item.id}`}
              aria-label={`${item.type === 'video' ? 'Play video' : 'View photo'}: ${item.title}`}
            >
              <div className="media-preview-container">
                <img
                  src={item.type === 'video' ? item.thumbnail : item.image}
                  alt={item.title}
                  loading="lazy"
                  className="media-preview-image"
                />

                {item.type === 'video' ? (
                  <div className="video-play-overlay">
                    <span className="video-play-pulse" aria-hidden="true" />
                    <span className="video-play-btn" aria-hidden="true">
                      <Play size={20} fill="currentColor" />
                    </span>
                    <span className="video-badge-pill">
                      <Video size={12} />
                      {item.duration || 'Lecture'}
                    </span>
                  </div>
                ) : (
                  <div className="photo-zoom-overlay">
                    <span className="photo-zoom-icon" aria-hidden="true">
                      <Plus size={20} />
                    </span>
                  </div>
                )}

                <span className="media-category-badge">{item.badge}</span>
              </div>

              <div className="media-card-content">
                <h4 className="media-card-title">{item.title}</h4>
                <p className="media-card-caption">
                  {item.type === 'photo' ? `“${item.caption}”` : item.caption}
                </p>
                <div className="media-card-footer">
                  <span className="media-type-tag">
                    {item.type === 'video' ? (
                      <>
                        <Video size={12} /> Playable Video
                      </>
                    ) : (
                      <>
                        <Image size={12} /> Clinical Photo
                      </>
                    )}
                  </span>
                  <span className="media-view-link">
                    <span>{item.type === 'video' ? 'Watch' : 'Explore'}</span>
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* MEDIA LIGHTBOX / VIDEO DIALOG */}
      <Dialog open={!!selectedMedia} onOpenChange={open => !open && setSelectedMedia(null)}>
        <DialogContent
          className={`instagram-dialog ${selectedMedia?.type === 'video' ? 'dialog-video-mode' : 'dialog-photo-mode'}`}
          data-testid="instagram-media-dialog"
          data-lenis-prevent
        >
          <div className="dialog-header-meta">
            <span className="dialog-badge">{selectedMedia?.badge}</span>
            <DialogTitle className="dialog-heading" data-testid="media-dialog-title">
              {selectedMedia?.title}
            </DialogTitle>
            <DialogDescription className="dialog-caption-text" data-testid="media-dialog-caption">
              {selectedMedia?.caption}
            </DialogDescription>
          </div>

          {selectedMedia?.type === 'video' ? (
            <div className="video-player-frame-wrap" data-testid="playable-video-frame">
              <iframe
                src={selectedMedia.embedUrl}
                title={selectedMedia.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="playable-video-iframe"
              />
            </div>
          ) : (
            selectedMedia && (
              <div className="photo-lightbox-frame-wrap">
                <img
                  src={selectedMedia.image}
                  alt={selectedMedia.title}
                  className="photo-lightbox-image"
                  data-testid="media-dialog-image"
                />
              </div>
            )
          )}

          <div className="dialog-actions-bar">
            <a
              href={selectedMedia?.instagramUrl || instagramProfile.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="dialog-instagram-btn"
              data-testid="dialog-instagram-external-link"
            >
              <Instagram size={17} />
              <span>View on @dradityanimbkar Instagram</span>
              <ArrowUpRight size={15} />
            </a>
            <span className="dialog-doctor-signoff">
              Dr. Aditya Nimbkar · MS Obs & Gyn, FFM, FRM, FMAS, DNB
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
