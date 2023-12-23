function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}
export default function ProgressBar({ progress, currentSong, audioRef }: any) {
  return (
    <>
      <div
        className='text-center mt-5'
        style={{
          backgroundColor: '#FFF', // BACKGROUND COLOUR
          height: '10px',
          width: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            backgroundColor: '#111111', // PROGRESS COLOUR
            width: `${progress}%`,
          }}
        ></div>
        <p className='mt-5'>
          {currentSong
            ? `${formatTime(audioRef.current?.currentTime ?? 0)} / ${formatTime(
                audioRef.current?.duration ?? 0
              )}`
            : '0:00 / 0:00'}
        </p>
      </div>
    </>
  );
}
