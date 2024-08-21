'use client'

export default function Hero() {
  return (
    <div className="relative bg-white pt-[20px] flex items-center justify-center h-[700px]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="https://cdn.pixabay.com/video/2023/03/09/153976-817104245_large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='relative text-center z-10'>
        <h1 className='font-extrabold text-4xl text-white'>From Asia to the World</h1>
        <h2 className='font-light text-xl text-white'>From Asia to the World, All yours!</h2>
      </div>
      <div className="absolute inset-0 bg-black opacity-30"></div>
    </div>
  )
}
