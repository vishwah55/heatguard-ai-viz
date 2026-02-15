interface VideoBackgroundProps {
  src: string;
  overlay?: string;
  className?: string;
}

const VideoBackground = ({ src, overlay = "bg-background/70", className = "" }: VideoBackgroundProps) => (
  <div className={`absolute inset-0 overflow-hidden ${className}`}>
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
    <div className={`absolute inset-0 ${overlay}`} />
  </div>
);

export default VideoBackground;
