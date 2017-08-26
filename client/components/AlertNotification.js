import React from 'react';

export default function AlertNotification ({message, shouldDisplay}) {
  if (!shouldDisplay) return null;
  return (
    <div className="alert alert-warning" role="alert">
      {message}
    </div>
  )
}
