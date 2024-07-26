import React, { useRef } from "react";
import { lazy, Suspense } from "react";

const LazySegment = lazy(() => import("../components/segmentPopup"));

function Home() {
  const dialogRef = useRef();

  function openModel() {
    dialogRef.current.show();
  }

  return (
    <>
      <div className="container">
        <button onClick={openModel} className="main-button">
          Save Segment
        </button>
      </div>
      <div className="popup-container">
      <Suspense fallback={<div className="fallback">Loading.......</div>}>
        <LazySegment ref={dialogRef} />
      </Suspense>
      </div>
    </>
  );
}

export default Home;
