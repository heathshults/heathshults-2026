'use client'
import * as React from 'react'

export default function Footer() {
  const [expanded, setExpanded] = React.useState(false)

  const handleToggle = () => setExpanded((prev) => !prev)

  return (
    <div
      className="nav_footer"
      style={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        height: expanded ? 'auto' : '30px',
        minHeight: '36px',
        background: 'rgba(0, 0, 0, 0.72)',
        color: '#fff',
        transition: 'height 0.3s',
        zIndex: 100,
        boxShadow: '0 -2px 8px rgba(0,0,0,0.15)',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      onClick={handleToggle}
    >
      <div className="nf_left" style={{ padding: expanded ? '10px 20px' : '3px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ margin: 0, fontSize: '1rem' }}>Copyright 2025 - Heath Shults</p>
        <div className="nf_right">
          <div className="neoh_fn_social_list">
            <ul style={{ display: 'flex', gap: '10px', margin: 0, padding: 0, listStyle: 'none' }}>
              <li><a href="#"><i className="fn-icon-twitter"></i></a></li>
              <li><a href="#"><i className="fn-icon-facebook"></i></a></li>
              <li><a href="#"><i className="fn-icon-instagram"></i></a></li>
              <li><a href="#"><i className="fn-icon-pinterest"></i></a></li>
              <li><a href="#"><i className="fn-icon-behance"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}