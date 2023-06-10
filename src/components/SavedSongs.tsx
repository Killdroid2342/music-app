import { Song } from '../Pages/Main';

export default function SavedSongs({ clientUsername, backToHome, songs }: any) {
  return (
    <div className='border border-white flex flex-col bg-neutral-700 text-center p-2'>
      <h2 className='font-bold text-lg'>Account: {clientUsername}</h2>
      <h2
        onClick={backToHome}
        className='border-2 border-white rounded-2xl p-2 m-2 cursor-pointer font-bold'
      >
        Log Out
      </h2>
      <h2 className='text-xl font-bold'>This is your Queue</h2>
      <ul>
        {songs.map((song: Song, index: number) => (
          <li key={index}>{song.name}</li>
        ))}
      </ul>
    </div>
  );
}
