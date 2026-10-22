import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Instagram,
  Play,
  Plus,
  Search,
  X,
  ExternalLink,
  ShieldCheck,
  Check,
  MapPin,
  Activity,
  ArrowUpRight,
  Filter,
  Stethoscope,
  Video,
  Sparkles
} from 'lucide-react';
import { PageIntro, Reveal, Chapter, Starburst } from '../components/Shared';
import { BookButton } from '../components/Appointment';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { instagramProfile, instagramMediaGallery, contact } from '../data/practice';

const CATEGORIES = [
  { key: 'all', label: 'All Media & Cases', icon: Sparkles },
  { key: 'videos', label: 'Video Masterclasses', icon: Video },
  { key: 'gynaecology', label: 'Gynaecological Surgery', icon: Activity },
  { key: 'pregnancy', label: 'High-Risk Pregnancy', icon: Stethoscope },
  { key: 'fertility', label: 'Fertility & IVF', icon: ShieldCheck },
  { key: 'fetal', label: 'Fetal Medicine & Scans', icon: MapPin }
];

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'all';

  const [activeTab, setActiveTab] = useState(
    CATEGORIES.some(c => c.key === initialTab) ? initialTab : 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && CATEGORIES.some(c => c.key === tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    if (key === 'all') {
      searchParams.delete('tab');
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ tab: key }, { replace: true });
    }
  };

  // Compute category counts
  const counts = useMemo(() => {
    const countMap = { all: instagramMediaGallery.length };
    CATEGORIES.forEach(c => {
      if (c.key !== 'all') {
        countMap[c.key] = instagramMediaGallery.filter(item => item.categoryKey === c.key).length;
      }
    });
    return countMap;
  }, []);

  // Filtered Media
  const filteredMedia = useMemo(() => {
    return instagramMediaGallery.filter(item => {
      const matchesTab = activeTab === 'all' || item.categoryKey === activeTab;
      if (!matchesTab) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.caption.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q))
      );
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="gallery-page">
      {/* PAGE INTRO HERO */}
      <section className="section-padding container gallery-hero">
        <PageIntro
          eyebrow="AUTHENTIC CLINICAL ARCHIVE · @DRADITYANIMBKAR"
          title="Clinical Gallery &"
          emphasis="Surgical Case Studies."
          description="High-resolution clinical photography, surgical milestones, advanced 3D fetal sonography, reproductive laboratory protocols, and academic video masterclasses documented by Dr. Aditya Nimbkar across Thane, Mulund & Kalyan."
        >
          <div className="gallery-hero-actions">
            <BookButton id="gallery-hero-book">
              Book a consultation
            </BookButton>
            <a
              href={instagramProfile.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="pill-button outline-button gallery-insta-cta"
              data-testid="gallery-external-insta-btn"
            >
              <Instagram size={17} />
              <span>Follow on Instagram</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </PageIntro>

        {/* INSTAGRAM PROFILE CARD */}
        <Reveal className="instagram-profile-banner" delay={0.1}>
          <div className="instagram-profile-card" data-testid="instagram-profile-card">
            <div className="instagram-avatar-wrap">
              <div className="instagram-avatar-ring">
                <img
                  src={instagramProfile.avatar}
                  alt={instagramProfile.name}
                  className="instagram-avatar-img"
                  data-testid="instagram-avatar"
                />
              </div>
              <span className="instagram-live-badge" title="Verified Medical Educator">
                <Instagram size={13} />
              </span>
            </div>

            <div className="instagram-profile-info">
              <div className="instagram-handle-row">
                <h3 className="instagram-handle-title">{instagramProfile.handle}</h3>
                <span className="instagram-verified-badge" title="Verified Clinical Account">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="instagram-faculty-pill">Faculty @ Conceptual OBG</span>
                <span className="instagram-hub-pill">Thane · Mulund · Kalyan</span>
              </div>
              <p className="instagram-profile-bio">{instagramProfile.bio}</p>
              <div className="instagram-profile-pills">
                <span><Check size={12} /> KEM &amp; LTMMC Alumnus</span>
                <span><Check size={12} /> {counts.videos} Video Masterclasses</span>
                <span><Check size={12} /> {counts.all - counts.videos} Clinical Case Photos</span>
                <span><Check size={12} /> 100% Authentic Practice Records</span>
              </div>
            </div>

            <div className="instagram-profile-action">
              <a
                href={instagramProfile.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="pill-button instagram-pill-btn"
                data-testid="instagram-direct-link"
              >
                <Instagram size={15} />
                <span>Visit Instagram</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </Reveal>

        {/* CONTROLS: CATEGORY TABS + SEARCH */}
        <div className="gallery-controls-card">
          <div className="gallery-filter-bar" role="tablist" aria-label="Filter media categories">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const count = counts[cat.key] || 0;
              const isActive = activeTab === cat.key;
              return (
                <button
                  key={cat.key}
                  role="tab"
                  aria-selected={isActive}
                  className={`gallery-filter-tab ${isActive ? 'active' : ''}`}
                  onClick={() => handleTabChange(cat.key)}
                  data-testid={`gallery-tab-${cat.key}`}
                >
                  <Icon size={14} />
                  <span>{cat.label}</span>
                  <span className={`tab-count ${isActive ? 'tab-count-active' : ''}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="gallery-search-wrap">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search cases (e.g. fibroid, IUI, B-Lynch, twins, prolapse, Doppler)..."
              className="gallery-search-input"
              data-testid="gallery-search-input"
              aria-label="Search clinical cases and masterclasses"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="clear-search-btn"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* RESULTS STATUS */}
        <div className="gallery-status-bar">
          <span className="results-count" data-testid="gallery-results-count">
            Showing <strong>{filteredMedia.length}</strong> {filteredMedia.length === 1 ? 'entry' : 'entries'}
            {activeTab !== 'all' && ` in ${CATEGORIES.find(c => c.key === activeTab)?.label}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>
          {(activeTab !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                handleTabChange('all');
                setSearchQuery('');
              }}
              className="reset-filters-btn"
              data-testid="gallery-reset-filters"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* MEDIA GRID */}
        {filteredMedia.length === 0 ? (
          <div className="gallery-empty-state" data-testid="gallery-empty-state">
            <Filter size={36} className="empty-icon" />
            <h3>No clinical cases found</h3>
            <p>We couldn’t find any cases matching your current search query. Try another keyword or clear filters.</p>
            <button
              onClick={() => {
                handleTabChange('all');
                setSearchQuery('');
              }}
              className="pill-button outline-button"
            >
              Show all media ({counts.all})
            </button>
          </div>
        ) : (
          <div className="gallery-cards-grid" data-testid="gallery-cards-grid">
            {filteredMedia.map((item, index) => {
              const isVideo = item.type === 'video';
              return (
                <Reveal key={item.id} delay={(index % 6) * 0.05} className="gallery-card-wrapper">
                  <div
                    className={`gallery-card ${isVideo ? 'gallery-card-video' : 'gallery-card-photo'} ${item.isFeatured ? 'featured-card' : ''}`}
                    onClick={() => setSelectedMedia(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedMedia(item);
                      }
                    }}
                    data-testid={`gallery-item-${item.id}`}
                  >
                    {item.isFeatured && (
                      <div className="gallery-featured-banner" data-testid="gallery-featured-banner">
                        <Sparkles size={12} />
                        <span>Highlighted Milestone Case</span>
                      </div>
                    )}
                    <div className="gallery-card-visual">
                      <img
                        src={isVideo ? item.thumbnail : item.image}
                        alt={item.title}
                        loading="lazy"
                        className="gallery-card-img"
                      />
                      <span className="gallery-card-badge">{item.badge}</span>

                      {isVideo ? (
                        <div className="gallery-video-overlay">
                          <span className="gallery-play-btn" aria-hidden="true">
                            <Play size={20} fill="currentColor" />
                          </span>
                          <span className="gallery-duration-pill">{item.duration}</span>
                        </div>
                      ) : (
                        <div className="gallery-photo-overlay">
                          <span className="gallery-zoom-btn" aria-hidden="true">
                            <Plus size={20} />
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="gallery-card-content">
                      <div className="gallery-card-meta">
                        <span className="gallery-card-cat">{item.category}</span>
                        {isVideo ? (
                          <span className="gallery-video-tag"><Video size={12} /> Masterclass</span>
                        ) : (
                          <span className="gallery-photo-tag"><Instagram size={12} /> Post Case</span>
                        )}
                      </div>
                      <h4 className="gallery-card-title">{item.title}</h4>
                      <p className="gallery-card-caption">
                        {item.caption.length > 140 ? `${item.caption.slice(0, 140)}...` : item.caption}
                      </p>
                      <div className="gallery-card-action">
                        <span>{isVideo ? 'Watch Lecture' : 'View Case Details'}</span>
                        <ArrowUpRight size={15} />
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}

        {/* CLINICAL DISCLAIMER & CITATION */}
        <div className="gallery-disclaimer-box">
          <ShieldCheck size={20} />
          <div>
            <strong>Clinical Education &amp; Practice Transparency</strong>
            <p>
              All surgical cases, ultrasonographic studies, and instructional videos presented herein are authored, conducted, or documented by Dr. Aditya Nimbkar. These records are shared for peer medical education and patient awareness. Individual clinical management requires thorough in-person medical evaluation.
            </p>
          </div>
        </div>
      </section>

      {/* POPUP MODAL: VIDEO MASTERCLASS OR PHOTO LIGHTBOX */}
      <Dialog open={!!selectedMedia} onOpenChange={open => !open && setSelectedMedia(null)}>
        <DialogContent className="gallery-modal-dialog" data-testid="gallery-detail-modal" data-lenis-prevent>
          {selectedMedia && (
            <div className="gallery-modal-inner">
              <div className="gallery-modal-header">
                <div>
                  <span className="modal-category-pill">{selectedMedia.category}</span>
                  <DialogTitle className="gallery-modal-title">{selectedMedia.title}</DialogTitle>
                </div>
              </div>

              <div className="gallery-modal-body">
                {selectedMedia.type === 'video' ? (
                  <div className="gallery-modal-video-wrapper">
                    <iframe
                      src={selectedMedia.embedUrl}
                      title={selectedMedia.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="gallery-modal-iframe"
                    />
                  </div>
                ) : (
                  <div className="gallery-modal-image-wrapper">
                    <img
                      src={selectedMedia.image}
                      alt={selectedMedia.title}
                      className="gallery-modal-image"
                    />
                    <span className="gallery-modal-badge">{selectedMedia.badge}</span>
                  </div>
                )}

                <div className="gallery-modal-text">
                  <DialogDescription className="gallery-modal-caption">
                    “{selectedMedia.caption}”
                  </DialogDescription>

                  <div className="gallery-modal-details">
                    {selectedMedia.outcome && (
                      <div className="modal-detail-row outcome-row">
                        <strong>Clinical Outcome:</strong>
                        <span className="outcome-text">{selectedMedia.outcome}</span>
                      </div>
                    )}
                    <div className="modal-detail-row">
                      <strong>Lead Specialist:</strong>
                      <span>Dr. Aditya Nimbkar (MS Obs &amp; Gyn, FFM, FRM, FMAS, DNB)</span>
                    </div>
                    <div className="modal-detail-row">
                      <strong>Consultation Hubs:</strong>
                      <span>Thane (Ova / Tieten) · Mulund (Maher) · Kalyan (Alfi Diagnostics)</span>
                    </div>
                    <div className="modal-detail-row">
                      <strong>Clinical Source:</strong>
                      <span>Official Medical Archive (@dradityanimbkar)</span>
                    </div>
                  </div>

                  <div className="gallery-modal-actions">
                    <a
                      href={selectedMedia.instagramUrl || instagramProfile.profileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="pill-button outline-button gallery-modal-insta-link"
                      data-testid="modal-view-on-instagram"
                    >
                      <Instagram size={16} />
                      <span>View on @dradityanimbkar Instagram</span>
                      <ExternalLink size={14} />
                    </a>

                    <BookButton
                      id="modal-appointment-btn"
                      className="pill-button"
                    >
                      Enquire about this care
                    </BookButton>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
