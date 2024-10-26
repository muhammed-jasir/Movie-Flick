import React from 'react'

const AboutPage = () => {
    return (
        <section className='max-w-6xl mx-auto pt-20 min-h-[600px] md:min-h-screen flex flex-col items-center'>
            <h1 className='text-4xl font-bold pt-2'>About us</h1>
            <div className='max-w-4xl mx-auto flex flex-col gap-3 bg-slate-900 px-4 md:px-6 py-6 rounded-md my-8'>
                <h2 className='text-2xl font-semibold text-center'>
                    Welcome to Movie Flick!
                </h2>

                <p className="text-lg text-gray-300">
                    Movie Flick is a movie and TV show exploration site created with love and passion by a movie enthusiast.
                    Here, you can explore a vast collection of movies and TV shows, get detailed information about your favorites, and discover new ones.
                </p>

                <p className="text-lg text-gray-300">
                    With Movie Flick, you can easily search for movies and TV shows, view detailed information,
                    and enjoy related videos including trailers, teasers, clips, bloopers, featurette and behind-the-scenes footage from YouTube.
                </p>

                <div className=''>
                    <h2 className="text-2xl font-semibold mb-2">Key Features</h2>

                    <ul className="list-disc text-gray-300 mb-2 pl-6">
                        <li>View detailed information about each title.</li>
                        <li>Watch trailers and exclusive video content</li>
                        <li>User-friendly interface for seamless navigation</li>
                        <li>Search functionality to quickly find your favorites</li>
                        <li>Responsive design for a smooth experience on all devices.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">Technologies Used</h2>
                    <ul className="list-disc text-gray-300 pl-6">
                        <li><strong>React:</strong> Building the frontend components.</li>
                        <li><strong>Tailwind CSS:</strong> Styling the UI.</li>
                        <li><strong>Firebase:</strong> User authentication and backend storage.</li>
                        <li><strong>TMDb API:</strong> Fetching real-time movie and TV show data.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mt-2">About me</h2>
                    <p className="text-lg text-gray-300 mt-2">
                        I am a passionate developer with a love for movies and technology. This project reflects
                        my commitment to creating user-friendly and visually appealing web applications.
                        I hope you enjoy using Movie Flick as much as I enjoyed building it!
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-white mb-2">Get in Touch</h2>
                    <p className="text-lg text-gray-300">
                        If you have any questions, suggestions, or just want to chat about movies, feel free to reach out!
                    </p>
                </div>
            </div>
        </section>
    )
}

export default AboutPage