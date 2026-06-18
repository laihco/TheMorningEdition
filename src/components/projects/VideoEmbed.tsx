type VideoEmbedProps = {
  videoId: string;
  title: string;
};

export function VideoEmbed({ videoId, title }: VideoEmbedProps) {
  return (
    <div className="video-frame">
      <iframe
        title={title}
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
