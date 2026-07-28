import { useState } from 'react';
import { DEFAULT_LOW_STOCK_THRESHOLD } from '../utils/inventoryStatus';
import './Settings.css';

export function Settings({ lowStockThreshold = DEFAULT_LOW_STOCK_THRESHOLD, onLowStockThresholdChange }) {
    const [inputValue, setInputValue] = useState(String(lowStockThreshold));
    const [error, setError] = useState('');
    const [saved, setSaved] = useState(false);

    function handleChange(e) {
        setInputValue(e.target.value);
        setError('');
        setSaved(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const parsed = Number(inputValue);

        if (inputValue.trim() === '' || !Number.isInteger(parsed) || parsed <= 0) {
            setError('Enter a whole number greater than 0.');
            return;
        }

        onLowStockThresholdChange(parsed);
        setSaved(true);
    }

    return (
        <div className="Settings">
            <h2>Settings</h2>
            <p>Configure how your inventory dashboard behaves.</p>

            <form className="settingsForm" onSubmit={handleSubmit} noValidate>
                <div className="settingField">
                    <label htmlFor="lowStockThreshold">Low stock threshold</label>
                    <p className="settingHint">
                        Products at or below this quantity are marked "Low Stock" on the dashboard and product list.
                    </p>
                    <input
                        type="number"
                        id="lowStockThreshold"
                        name="lowStockThreshold"
                        min="1"
                        step="1"
                        value={inputValue}
                        onChange={handleChange}
                        className={error ? 'inputError' : ''}
                        aria-invalid={Boolean(error)}
                    />
                    {error && <span className="errorText">{error}</span>}
                    {saved && !error && <span className="savedText">Saved.</span>}
                </div>
                <button type="submit" className="saveBtn">Save</button>
            </form>
        </div>
    );
}
