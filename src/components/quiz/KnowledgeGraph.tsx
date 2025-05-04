
import React, { useEffect, useRef } from "react";
import { KnowledgeNode } from "@/types/quiz";
import { generateKnowledgeMap } from "@/utils/quizUtils";

interface KnowledgeGraphProps {
  nodes: KnowledgeNode[];
  centerId: string;
  onNodeClick?: (nodeId: string) => void;
}

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({
  nodes,
  centerId,
  onNodeClick,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;
    
    const { nodes: graphNodes, links } = generateKnowledgeMap(nodes, centerId);
    
    // Clear previous graph
    while (svgRef.current.firstChild) {
      svgRef.current.removeChild(svgRef.current.firstChild);
    }
    
    const svg = svgRef.current;
    const width = svg.clientWidth;
    const height = svg.clientHeight;
    
    // Create a basic force-directed graph layout
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Position nodes in a circular layout
    const centerNode = graphNodes.find(n => n.id === centerId);
    if (centerNode) {
      centerNode.x = centerX;
      centerNode.y = centerY;
    }
    
    const level1Nodes = graphNodes.filter(n => n.level === 1);
    const level2Nodes = graphNodes.filter(n => n.level === 2);
    
    // Position level 1 nodes in inner circle
    const level1Radius = 100;
    level1Nodes.forEach((node, idx) => {
      const angle = (2 * Math.PI * idx) / level1Nodes.length;
      node.x = centerX + level1Radius * Math.cos(angle);
      node.y = centerY + level1Radius * Math.sin(angle);
    });
    
    // Position level 2 nodes in outer circle
    const level2Radius = 180;
    level2Nodes.forEach((node, idx) => {
      const angle = (2 * Math.PI * idx) / level2Nodes.length;
      node.x = centerX + level2Radius * Math.cos(angle);
      node.y = centerY + level2Radius * Math.sin(angle);
    });
    
    // Draw links first (to be in the background)
    links.forEach(link => {
      const source = graphNodes.find(n => n.id === link.source);
      const target = graphNodes.find(n => n.id === link.target);
      
      if (source && target && source.x !== undefined && source.y !== undefined && 
          target.x !== undefined && target.y !== undefined) {
        const linkElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        linkElement.setAttribute('x1', source.x.toString());
        linkElement.setAttribute('y1', source.y.toString());
        linkElement.setAttribute('x2', target.x.toString());
        linkElement.setAttribute('y2', target.y.toString());
        linkElement.setAttribute('stroke', '#D4A72C');
        linkElement.setAttribute('stroke-opacity', '0.5');
        linkElement.setAttribute('stroke-width', link.value.toString());
        svg.appendChild(linkElement);
      }
    });
    
    // Draw nodes
    graphNodes.forEach(node => {
      if (node.x === undefined || node.y === undefined) return;
      
      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      group.classList.add('cursor-pointer', 'transform', 'transition-transform', 'duration-300');
      group.addEventListener('click', () => {
        if (onNodeClick) onNodeClick(node.id);
      });
      
      // Add hover effect
      group.addEventListener('mouseenter', () => {
        group.setAttribute('transform', 'scale(1.1)');
      });
      group.addEventListener('mouseleave', () => {
        group.setAttribute('transform', 'scale(1)');
      });
      
      // Node circle
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', node.x.toString());
      circle.setAttribute('cy', node.y.toString());
      circle.setAttribute('r', node.level === 0 ? '25' : '20');
      
      // Color based on category
      let fillColor = '#2C8E91'; // Default teal
      if (node.category === 'traditional') fillColor = '#A02C2C'; // Red
      if (node.category === 'opera') fillColor = '#D4A72C'; // Gold
      if (node.category === 'crafts') fillColor = '#5C2CA0'; // Purple
      if (node.category === 'festival') fillColor = '#2CA05C'; // Green
      
      circle.setAttribute('fill', fillColor);
      circle.setAttribute('fill-opacity', '0.8');
      circle.setAttribute('stroke', 'white');
      circle.setAttribute('stroke-width', '2');
      
      // Add pulse animation for center node
      if (node.level === 0) {
        const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animate.setAttribute('attributeName', 'r');
        animate.setAttribute('from', '22');
        animate.setAttribute('to', '28');
        animate.setAttribute('dur', '1.5s');
        animate.setAttribute('repeatCount', 'indefinite');
        animate.setAttribute('begin', '0s');
        circle.appendChild(animate);
        
        const animateOpacity = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animateOpacity.setAttribute('attributeName', 'fill-opacity');
        animateOpacity.setAttribute('from', '0.8');
        animateOpacity.setAttribute('to', '0.5');
        animateOpacity.setAttribute('dur', '1.5s');
        animateOpacity.setAttribute('repeatCount', 'indefinite');
        animateOpacity.setAttribute('begin', '0s');
        circle.appendChild(animateOpacity);
      }
      
      group.appendChild(circle);
      
      // Text label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', node.x.toString());
      text.setAttribute('y', node.y.toString());
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('fill', 'white');
      text.setAttribute('font-size', '10');
      text.setAttribute('font-weight', 'bold');
      text.textContent = node.label.length > 6 ? node.label.substring(0, 6) + '...' : node.label;
      group.appendChild(text);
      
      svg.appendChild(group);
    });
    
  }, [nodes, centerId, onNodeClick]);
  
  return (
    <div className="w-full overflow-hidden my-4">
      <h3 className="text-lg font-medium mb-2">知识关联图谱</h3>
      <div className="border border-heritage-gold/20 rounded-xl bg-heritage-paper/50 p-4">
        <svg 
          ref={svgRef} 
          className="w-full h-[300px] overflow-visible" 
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Graph will be rendered here */}
        </svg>
      </div>
    </div>
  );
};

export default KnowledgeGraph;
