
export default function SearchBar () {
    return (
        <div className="input-group w-75">
            <div className="input-group-text bg-light">
                <span className="text-primary d-flex align-items-center justify-content-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </span>
            </div>
            <input 
                className="form-control"
                id="search-box"
                type="text"
                name="search"
                placeholder="Search..."
                required="required"
                onKeyUp={e => search(e.target.value)}
            ></input>
        </div>
    );
}