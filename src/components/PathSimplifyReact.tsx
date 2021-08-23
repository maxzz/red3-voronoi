import React, { useContext } from 'react';
import { RouteComponentProps } from '@reach/router';
import simplifyPath from '@luncheon/simplify-svg-path';
import { useDrag } from 'react-use-gesture';
import { pointer } from '../utils/pointer';
import { PathSimplifyContext } from '../store/PathSimplify';

interface PathSimplifyReactProps extends RouteComponentProps {

}

const PathSimplifyReact: React.FC<PathSimplifyReactProps> = () => {
    const svgRef = React.useRef<SVGSVGElement>(null);
    const { points, setPoints } = useContext(PathSimplifyContext);

    const bind = useDrag((event) => {

        if (event.event.type === 'pointerdown') {
            console.log('pointerdown', event);
        }

        if (event.dragging && event.buttons === 1) {
            // console.log('pts', points);
            console.log('drag', event);
            let pt = pointer(event.event, svgRef.current);
            setPoints(prev => [...prev, pt]);
        }

        if (event.event.type === 'pointerup') {
            // if (points.length > 1) {
            //     setPath(simplifyPath(points));
            // }
        }
    });

    const path = React.useMemo(() => points.length > 1 ? simplifyPath(points) : '', [points]);

    return (
        <div className="relative">
            <svg ref={svgRef} {...bind()} width={500} height={500} className="bg-purple-300">
                <path fill="none" stroke="red" d={path} />
                {points.map((pt, idx) => {
                    return <circle cx={pt[0]} cy={pt[1]} r={3} key={idx} fill="none" stroke="blue" />;
                })}
            </svg>
            <div className="ml-2 mb-2 absolute bottom-0 flex items-center space-x-1">
                <button className="p-2 border border=gray-400 rounded shadow" onClick={() => setPoints([])}>Clear</button>
                <div className="">Points: {points.length}</div>
            </div>
        </div>
    );
};

export default PathSimplifyReact;
