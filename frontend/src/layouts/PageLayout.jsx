import React from 'react';

/**
 * Common page layout component
 */
const PageLayout = ({
  children,
  title,
  subtitle,
  className = '',
  maxWidth = 'max-w-7xl'
}) => {
  return (
    <div className={`min-h-screen bg-gray-900 py-8 ${className}`}>
      <div className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8`}>
        {(title || subtitle) && (
          <div className="mb-8">
            {title && (
              <h1 className="text-3xl font-bold text-white mb-2">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default PageLayout;