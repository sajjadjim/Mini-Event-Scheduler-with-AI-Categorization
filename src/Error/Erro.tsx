

const Error = () => {
    return (
        <div>
             <section className="bg-white font-serif py-10">
            <div className="container mx-auto px-4">
                <div className="flex justify-center">
                    <div className="w-full max-w-3xl text-center">
                        <div
                            className="h-[400px] bg-center bg-no-repeat bg-cover flex items-center justify-center"
                            style={{
                                backgroundImage:
                                    "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
                            }}
                        >
                            <h1 className="text-6xl font-bold">404</h1>
                        </div>
                        <div className="-mt-12">
                            <h3 className="text-2xl font-semibold mb-2">
                                Looks like you're lost
                            </h3>
                            <p className="text-gray-600 mb-6">
                                The page you are looking for is not available!
                            </p>
                            <a
                                href="/"
                                className="inline-block bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
                            >
                                Go to Home
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    );
};

export default Error;