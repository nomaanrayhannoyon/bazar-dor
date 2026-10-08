const Navlink = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");

    const data = await res.json();
    
    console.log(data);

    return (
        <div className="bg-white border-b py-3 shadow-sm">

             <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 overflow-x-auto scrollbar-none">
               
                {data.map((category: any, index: number) => (
                    <a
                       key={index}

                       href={`#${category.slug || index}`}

              className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 text-gray-700 text-sm font-medium whitespace-nowrap transition-colors"
             >
                       
                 <span>{category.icon || "🛒"}</span>
          
                        <span>{category.nameBn}</span>
                    </a>
                ))}

            </div>
        </div>
    );
};

export default Navlink;