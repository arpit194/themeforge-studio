import { HeroSection } from "./HeroSection";
import { StatsStrip } from "./StatsStrip";
import { FeaturesSection } from "./FeaturesSection";
import { LiveDemo } from "./LiveDemo";
import { QuickStartSection } from "./QuickStartSection";
import { Footer } from "./Footer";
import { Navbar } from "../shared/Navbar";
import styles from "./HomePage.module.css";

export function HomePage() {
  return (
    <main className={styles.page}>
      <Navbar />
      <HeroSection />
      <StatsStrip />
      <FeaturesSection />
      <LiveDemo />
      <QuickStartSection />
      <Footer />
    </main>
  );
}
