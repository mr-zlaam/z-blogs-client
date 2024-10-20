'use client'
import React, { Fragment } from 'react'
import Link from "next/link";
import { ThemeToggler } from "@/theme/ThemeToggler";
import { dashboardNavlinks } from '../dashboard-header/NavLinkDashBoardHeader';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useActivePath } from '@/helper/checkActivePath/CheckActivePath';
function Aside() {
  const isActivePath = useActivePath();
  return (
    <>

      <aside className="fixed inset-y-0 left-0 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">

          {dashboardNavlinks.map(link => (
            <Fragment key={link.name}>
              <Link title={link.name} href={link.path} className={cn(link.className, isActivePath(link.path) && "text-foreground scale-110")}>
                <link.icon className={link.iconClassName} />
              </Link>
            </Fragment>
          ))}
          <div className="">
            <ThemeToggler />
          </div>
        </nav>
      </aside>
    </>
  )
}

export default Aside
