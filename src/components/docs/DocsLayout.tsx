import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Drawer } from "@base-ui/react/drawer";
import { Menu, X } from "lucide-react";
import { DOC_SECTIONS } from "./docsSections";
import { Navbar } from "../shared/Navbar";
import { usePortal } from "../../context/PortalContext";
import styles from "./DocsLayout.module.css";

function SidebarNav({ pathname }: { pathname: string }) {
  return (
    <nav>
      {DOC_SECTIONS.map(section => (
        <div key={section.title} className={styles.sidebarSection}>
          <span className={styles.sidebarTitle}>{section.title}</span>
          {section.items.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={pathname === item.path
                ? `${styles.sidebarLink} ${styles.sidebarLinkActive}`
                : styles.sidebarLink}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}

export function DocsLayout() {
  const { pathname } = useLocation();
  const portalRef = usePortal();

  const allItems = DOC_SECTIONS.flatMap(s => [...s.items] as { label: string; path: string }[]);
  const currentIndex = allItems.findIndex(i => i.path === pathname);
  const prev = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const next = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  return (
    <div className={styles.shell}>
      <Navbar section="Docs" />

      <div className={styles.body}>
        {/* Desktop sidebar */}
        <aside className={styles.sidebar}>
          <SidebarNav pathname={pathname} />
        </aside>

        <main className={styles.content}>
          {/* Mobile drawer trigger */}
          <Drawer.Root>
            <Drawer.Trigger className={styles.drawerTrigger}>
              <Menu size={18} />
              <span>Menu</span>
            </Drawer.Trigger>
            <Drawer.Portal container={portalRef}>
              <Drawer.Backdrop className={styles.drawerBackdrop} />
              <Drawer.Popup className={styles.drawerPopup}>
                <div className={styles.drawerHeader}>
                  <span className={styles.drawerTitle}>Docs</span>
                  <Drawer.Close className={styles.drawerClose}>
                    <X size={18} />
                  </Drawer.Close>
                </div>
                <SidebarNav pathname={pathname} />
              </Drawer.Popup>
            </Drawer.Portal>
          </Drawer.Root>

          <Outlet />

          {(prev || next) && (
            <div className={styles.pagination}>
              {prev ? (
                <Link to={prev.path} className={styles.pageLink}>
                  <span className={styles.pageLinkDir}>← Previous</span>
                  <span className={styles.pageLinkLabel}>{prev.label}</span>
                </Link>
              ) : <span />}
              {next ? (
                <Link to={next.path} className={`${styles.pageLink} ${styles.pageLinkRight}`}>
                  <span className={styles.pageLinkDir}>Next →</span>
                  <span className={styles.pageLinkLabel}>{next.label}</span>
                </Link>
              ) : <span />}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
