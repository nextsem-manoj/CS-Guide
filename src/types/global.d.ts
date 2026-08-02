import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'amp-auto-ads': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { type?: string; 'data-ad-client'?: string }, HTMLElement>;
      'amp-ad': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { type?: string; 'data-ad-client'?: string; 'data-ad-slot'?: string; width?: string; height?: string; layout?: string }, HTMLElement>;
    }
  }
}
