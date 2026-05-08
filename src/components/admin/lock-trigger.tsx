import { useEffect, useRef, useState } from "react";
import { Lock } from "lucide-react";
import { AdminGate } from "./admin-gate";

/**
 * Hidden admin entry.
 *
 * Requirements:
 * 1. Tap 6 times within 4 seconds
 * 2. Start long press within 13 seconds after last tap
 * 3. Hold continuously for 10 seconds
 */
export function LockTrigger() {
  const [open, setOpen] = useState(false);

  const tapCountRef = useRef(0);
  const firstTapAtRef = useRef(0);

  const tapWindowTimerRef = useRef<number | null>(null);

  const armedRef = useRef(false);
  const armWindowRef = useRef<number | null>(null);

  const pressTimerRef = useRef<number | null>(null);

  const pressStartPosRef = useRef<{
    x: number;
    y: number;
  } | null>(null);

  const clearTimers = () => {
    if (tapWindowTimerRef.current) {
      window.clearTimeout(tapWindowTimerRef.current);
      tapWindowTimerRef.current = null;
    }

    if (armWindowRef.current) {
      window.clearTimeout(armWindowRef.current);
      armWindowRef.current = null;
    }

    if (pressTimerRef.current) {
      window.clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  const reset = () => {
    tapCountRef.current = 0;
    firstTapAtRef.current = 0;

    armedRef.current = false;

    pressStartPosRef.current = null;

    clearTimers();
  };

  // Reset on outside interaction or scroll
  useEffect(() => {
    const onScroll = () => {
      if (pressTimerRef.current) {
        console.log("lock: scroll cancelled press");
        reset();
      }
    };

    const onDocPointer = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;

      if (!el?.closest?.("[data-lock-trigger]")) {
        if (
          armedRef.current ||
          tapCountRef.current > 0
        ) {
          console.log("lock: outside tap reset");
          reset();
        }
      }
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    document.addEventListener(
      "pointerdown",
      onDocPointer
    );

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );

      document.removeEventListener(
        "pointerdown",
        onDocPointer
      );

      clearTimers();
    };
  }, []);

  const registerTap = () => {
    const now = Date.now();

    console.log("tap detected");

    // Reset tap sequence if more than 4 seconds passed
    if (
      tapCountRef.current === 0 ||
      now - firstTapAtRef.current > 4000
    ) {
      tapCountRef.current = 1;
      firstTapAtRef.current = now;

      if (tapWindowTimerRef.current) {
        window.clearTimeout(
          tapWindowTimerRef.current
        );
      }

      // Entire 6-tap sequence must finish within 4s
      tapWindowTimerRef.current =
        window.setTimeout(() => {
          if (!armedRef.current) {
            tapCountRef.current = 0;
            firstTapAtRef.current = 0;
          }
        }, 4000);

      return;
    }

    tapCountRef.current += 1;

    console.log(
      `lock trigger: tap ${tapCountRef.current}`
    );

    // 6 taps completed
    if (tapCountRef.current >= 6) {
      console.log(
        "lock trigger: tap requirement completed"
      );

      armedRef.current = true;

      tapCountRef.current = 0;

      if (armWindowRef.current) {
        window.clearTimeout(armWindowRef.current);
      }

      // User must START hold within 13s
      armWindowRef.current =
        window.setTimeout(() => {
          console.log(
            "lock trigger: arm window expired"
          );

          armedRef.current = false;
        }, 13000);
    }
  };

  const startLongPress = (
    x: number,
    y: number
  ) => {
    if (!armedRef.current) return;

    console.log(
      "lock trigger: long press started. Hold for 10 seconds..."
    );

    pressStartPosRef.current = { x, y };

    if (pressTimerRef.current) {
      window.clearTimeout(pressTimerRef.current);
    }

    // Hold continuously for 10s
    pressTimerRef.current =
      window.setTimeout(() => {
        console.log(
          "lock trigger: long press success! Opening Admin Gate..."
        );

        setOpen(true);

        reset();
      }, 10000);
  };

  const cancelLongPress = (
    reason: string
  ) => {
    if (pressTimerRef.current) {
      console.log(
        "lock: press cancelled —",
        reason
      );

      window.clearTimeout(pressTimerRef.current);

      pressTimerRef.current = null;

      pressStartPosRef.current = null;
    }
  };

  const onPointerDown = (
    e: React.PointerEvent
  ) => {
    e.preventDefault();

    registerTap();

    startLongPress(
      e.clientX,
      e.clientY
    );
  };

  const onPointerMove = (
    e: React.PointerEvent
  ) => {
    if (
      !pressTimerRef.current ||
      !pressStartPosRef.current
    ) {
      return;
    }

    const dx =
      e.clientX - pressStartPosRef.current.x;

    const dy =
      e.clientY - pressStartPosRef.current.y;

    if (Math.hypot(dx, dy) > 25) {
      cancelLongPress("moved");
    }
  };

  const onPointerUp = () =>
    cancelLongPress("released");

  return (
    <>
      <button
        data-lock-trigger
        aria-label=""
        tabIndex={-1}
        type="button"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerUp}
        onContextMenu={(e) =>
          e.preventDefault()
        }
        style={{
          position: "fixed",
          top: "16px",
          right: "16px",
          width: "28px",
          height: "28px",
          opacity: 0.15,
          zIndex: 9999,
          cursor: "default",
          pointerEvents: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          border: "none",
          color: "#2B2B2B",
          WebkitTapHighlightColor:
            "transparent",
          touchAction: "none",
          userSelect: "none",
        }}
      >
        <Lock
          size={16}
          strokeWidth={1.5}
        />
      </button>

      {open && (
        <AdminGate
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}