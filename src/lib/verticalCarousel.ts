import gsap from "gsap";

export type LoopFunctions = {
    current: () => number,
    next: (vars: GSAPTweenVars) => GSAPTimeline | GSAPTween,
    previous: (vars: GSAPTweenVars) => GSAPTimeline | GSAPTween,
    toIndex: (index: number, vars: GSAPTweenVars) => GSAPTimeline | GSAPTween,
    closestIndex: (setCurrent: boolean) => number,
    times: number[]
}

// current: (): number => indexIsDirty ? tl.closestIndex(true) : curIndex,
// next: (vars: GSAPTweenVars) => toIndex(tl.current() + 1, vars),
// previous: (vars: GSAPTweenVars) => toIndex(tl.current() - 1, vars),
// toIndex: (index: number, vars: GSAPTweenVars) => toIndex(index, vars),
// closestIndex: (setCurrent: boolean): number => closestIndex(setCurrent),
// times,
/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses yPercent so that even if the heights change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like draggable: true, center: true, speed (default: 1, which travels at roughly 100 pixels per second), paused (boolean), repeat, reversed, and paddingBottom.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot.
 */
export function verticalLoop(
    items_: string | object | Element | null,
    config: {
        repeat?: number;
        paused?: boolean;
        speed?: number;
        snap?: number | false;
        paddingRight?: number;
        paddingBottom?: number;
        reversed?: boolean;
        center?: boolean | string | Element | object | null;
        onChange?: (element: HTMLDivElement, index: number) => void
    } = {}
) {
    let timeline: GSAPTimeline & LoopFunctions = {} as GSAPTimeline & LoopFunctions;
    const items = gsap.utils.toArray(items_) as HTMLDivElement[];
    config = config || {};
    gsap.context(() => { // use a context so that if this is called from within another context or a gsap.matchMedia(), we can perform proper cleanup like the "resize" event handler on the window
        let onChange = config.onChange;
        let lastIndex = 0;
        const tl = gsap.timeline({
            repeat: config.repeat, onUpdate: onChange && function () {
                let i = tl.closestIndex();
                if (lastIndex !== i) {
                    lastIndex = i;
                    onChange(items[i], i);
                }
            },
            paused: config.paused,
            defaults: { ease: "none" },
            onReverseComplete: () => {
                tl.totalTime(tl.rawTime() + tl.duration() * 100)
            }
        });
        const length = items.length;
        const startY = items[0].offsetTop;
        const times: number[] = [];
        const heights: number[] = [];
        const spaceBefore: number[] = [];
        const yPercents: number[] = [];
        const center = config.center;
        const pixelsPerSecond = (config.speed || 1) * 100;
        const snap = config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1); // some browsers shift by a pixel to accommodate flex layouts, so for example if height is 20% the first element's height might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
        let curIndex = 0;
        let indexIsDirty = false;
        let timeOffset = 0;
        let container: HTMLElement;

        if (center === true) items[0].parentNode
        else if (center) {
            gsap.utils.toArray(center)[0] || items[0].parentNode
        }
        else container = items[0].parentNode as HTMLElement;

        let totalHeight = 0;
        const getTotalHeight = () =>
            items[length - 1].offsetTop + yPercents[length - 1] / 100 * heights[length - 1] - startY +
            spaceBefore[0] + items[length - 1].offsetHeight *
            (gsap.getProperty(items[length - 1], "scaleY") as number) +
            (config.paddingBottom ?? 0);

        const populateHeights = () => {
            let b1 = container.getBoundingClientRect()
            items.forEach((el, i) => {
                heights[i] = parseFloat((gsap.getProperty(el, "height", "px") as string));
                yPercents[i] = snap(parseFloat(gsap.getProperty(el, "y", "px") as string) / heights[i] * 100 + (gsap.getProperty(el, "yPercent") as number));
                const b2 = el.getBoundingClientRect();
                spaceBefore[i] = b2.top - (i ? b1.bottom : b1.top);
                b1 = b2;
            });
            gsap.set(items, { // convert "y" to "yPercent" to make things responsive, and populate the heights/yPercents Arrays to make lookups faster.
                yPercent: i => yPercents[i]
            });
            totalHeight = getTotalHeight();
        };

        let timeWrap: (index: number) => number;

        const populateOffsets = () => {
            timeOffset = center === true ? tl.duration() * (container.offsetHeight / 2) / totalHeight : 0;
            center === true && times.forEach((_, i) => {
                times[i] = timeWrap(tl.labels["label" + i] + tl.duration() * heights[i] / 2 / totalHeight - timeOffset);
            });
        };

        const getClosest = (values: number[], value: number, wrap: number) => {
            let i = values.length,
                closest = 1e10,
                index = 0, d;
            while (i--) {
                d = Math.abs(values[i] - value);
                if (d > wrap / 2) {
                    d = wrap - d;
                }
                if (d < closest) {
                    closest = d;
                    index = i;
                }
            }
            return index;
        };

        const populateTimeline = () => {
            let i, item, curY, distanceToStart, distanceToLoop;
            tl.clear();
            for (i = 0; i < length; i++) {
                item = items[i];
                curY = yPercents[i] / 100 * heights[i];
                distanceToStart = item.offsetTop + curY - startY + spaceBefore[0];
                distanceToLoop = distanceToStart + heights[i] * (gsap.getProperty(item, "scaleY") as number);
                tl.to(item, { yPercent: snap((curY - distanceToLoop) / heights[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
                    .fromTo(item, { yPercent: snap((curY - distanceToLoop + totalHeight) / heights[i] * 100) }, { yPercent: yPercents[i], duration: (curY - distanceToLoop + totalHeight - curY) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
                    .add("label" + i, distanceToStart / pixelsPerSecond);
                times[i] = distanceToStart / pixelsPerSecond;
            }
            timeWrap = gsap.utils.wrap(0, tl.duration());
        };

        const refresh = (deep?: boolean) => {
            let progress = tl.progress();
            tl.progress(0, true);
            populateHeights();
            deep && populateTimeline();
            populateOffsets();
            deep && tl.paused() ? tl.time(times[curIndex], true) : tl.progress(progress, true);
        };

        const onResize = () => refresh(true);
        gsap.set(items, { y: 0 });
        populateHeights();
        populateTimeline();
        populateOffsets();
        window.addEventListener("resize", onResize);

        function toIndex(index: number, vars: GSAPTweenVars) {
            vars = vars || {};
            (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
            let newIndex = gsap.utils.wrap(0, length, index),
                time = times[newIndex];
            if (time > tl.time() !== index > curIndex && index !== curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
                time += tl.duration() * (index > curIndex ? 1 : -1);
            }
            if (time < 0 || time > tl.duration()) {
                vars.modifiers = { time: timeWrap };
            }
            curIndex = newIndex;
            vars.overwrite = true;
            return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
        };

        function closestIndex(setCurrent: boolean) {
            let index = getClosest(times, tl.time(), tl.duration());
            if (setCurrent) {
                curIndex = index;
                indexIsDirty = false;
            }
            return index;
        };

        const extra: LoopFunctions = {
            current: (): number => indexIsDirty ? closestIndex(true) : curIndex,
            next: (vars: GSAPTweenVars) => toIndex(curIndex + 1, vars),
            previous: (vars: GSAPTweenVars) => toIndex(curIndex - 1, vars),
            toIndex: (index: number, vars: GSAPTweenVars) => toIndex(index, vars),
            closestIndex: (setCurrent: boolean): number => closestIndex(setCurrent),
            times: times,
        }

        tl.progress(1, true).progress(0, true) // pre-render for performance

        if (config.reversed) {
            tl.vars.onReverseComplete?.();
            tl.reverse();
        }

        closestIndex(true);
        lastIndex = curIndex;
        onChange && onChange(items[curIndex], curIndex);
        timeline = Object.assign(tl, extra);
        return () => window.removeEventListener("resize", onResize); // cleanup
    });

    return timeline;
}