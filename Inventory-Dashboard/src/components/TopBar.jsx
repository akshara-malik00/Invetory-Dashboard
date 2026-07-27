import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import './TopBar.css'
import { FaBell } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { GlobalSearchDropdown } from './GlobalSearchDropdown';
import { matchesProductSearch } from '../utils/productSearch';

export function TopBar({ products = [] }){
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const searchWrapperRef = useRef(null);
    const navigate = useNavigate();

    const trimmedQuery = query.trim();
    const results = trimmedQuery
        ? products.filter((product) => matchesProductSearch(product, trimmedQuery))
        : [];

    // Closes the dropdown on any click that lands outside the search box.
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function goToProductsWithQuery(searchValue) {
        navigate(`/Products?search=${encodeURIComponent(searchValue)}`);
        setIsOpen(false);
    }

    function handleChange(event) {
        setQuery(event.target.value);
        setIsOpen(true);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter' && trimmedQuery) {
            goToProductsWithQuery(trimmedQuery);
        }
    }

    return(
        <div className="topbar">
            <div className="topbar-row">
                <div className="search-wrapper" ref={searchWrapperRef}>
                    <FaSearch className="search-icon" />
                    <input
                        className="search-input"
                        placeholder='Search Inventory, SKU or orders '
                        value={query}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => trimmedQuery && setIsOpen(true)}
                    ></input>
                    {isOpen && trimmedQuery && (
                        <GlobalSearchDropdown
                            results={results}
                            onSelect={() => goToProductsWithQuery(trimmedQuery)}
                        />
                    )}      
                </div>
                <div className="topbar-icons">
                    <FaBell className="topbar-icon" />
                    <FaQuestion className="topbar-icon" />
                </div>
            </div>
            <hr />
        </div>
    );
}
