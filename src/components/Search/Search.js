import '../../colors.css';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
    return (
        <div className="input-group w-75">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1" style={{backgroundColor: 'var(--background)'}}>
                    <SearchIcon />
                </span>
            </div>
            <input 
            type="text" 
            className="form-control shadow-none" 
            placeholder="O que você procura? :)" 
            aria-label="Username" 
            aria-describedby="basic-addon1" 
            />
        </div>
    )
}

export default Search;