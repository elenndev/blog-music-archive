'use client'
interface toggleThemeButtonProps {
    changeTheme: (newTheme: string) => void;
    theme: string;
}
export default function ToggleThemeButton({changeTheme, theme} : toggleThemeButtonProps){
    return (
        <button type='button'
        onClick={()=>{
            changeTheme(theme == 'light' ? 'dark' : 'light');
            localStorage.setItem("theme", theme == 'light' ? 'dark' : 'light')}}>
            <p>Mudar para modo {theme == 'light' ? 'escuro' : 'claro'}</p>
        </button>
    )
}