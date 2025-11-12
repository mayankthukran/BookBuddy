

const MyBooks = () => {

  return (
    <div className="min-h-screen light-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2" style={{color: '#000000'}}>
              My Books
            </h1>
            <p className="text-lg" style={{color: '#4A70A9'}}>
              Manage your personal library
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBooks;