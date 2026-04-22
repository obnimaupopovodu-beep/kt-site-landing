import React, {useEffect, useId, useRef} from 'react';

export interface TrustedItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  linkHref: string;
  linkLabel: string;
}

interface TrustedModalProps {
  item: TrustedItem;
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLElement | null>;
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export function TrustedModal({item, onClose, returnFocusRef}: TrustedModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? [];
    const initialFocusTarget = focusableElements[0];
    initialFocusTarget?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || focusableElements.length === 0) {
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [onClose, returnFocusRef]);

  return (
    <div
      className="trusted-modal-backdrop"
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        ref={modalRef}
        className="trusted-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="trusted-modal-close"
          onClick={onClose}
          aria-label="Закрыть модальное окно"
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="trusted-modal-media">
          <img src={item.image} alt={item.title} className="trusted-modal-image" />
        </div>

        <div className="trusted-modal-body">
          <p className="trusted-modal-kicker">Trust & social proof</p>
          <h3 id={titleId} className="trusted-modal-title">{item.title}</h3>
          <p className="trusted-modal-subtitle">{item.subtitle}</p>
          <p id={descriptionId} className="trusted-modal-description">{item.description}</p>
          <a
            href={item.linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="trusted-modal-link"
          >
            {item.linkLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
