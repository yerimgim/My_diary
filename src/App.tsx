import MainHome from '@/components/MainHome';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from './components/mode-toggle';

export default function Home() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="w-[800px] h-[800px] flex justify-center">
        <MainHome />
        <ModeToggle />
      </main>
    </ThemeProvider>
  );
}
