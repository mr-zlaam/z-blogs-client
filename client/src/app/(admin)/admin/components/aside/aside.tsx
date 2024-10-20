'use client'
import React, { Fragment } from 'react'
import Link from "next/link";
import { ThemeToggler } from "@/theme/ThemeToggler";
import { dashboardNavlinks } from '../dashboard-header/NavLinkDashBoardHeader';
function Aside() {
  return (
    <>

      <aside className="fixed inset-y-0 left-0 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">

          {dashboardNavlinks.map(link => (
            <Fragment key={link.name}>
              <Link title={link.name} href={link.path} className={link.className}>
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
