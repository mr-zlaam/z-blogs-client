import React, { Fragment } from 'react'

import {
  PanelLeft,
  Search,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggler } from "@/theme/ThemeToggler";
import DivWrapper from '@/_subComponents/divWrapper/DivWrapper';
import { dashboardNavlinks } from './NavLinkDashBoardHeader';
function DashBoardHeader() {
  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4  sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <DivWrapper className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
            </DivWrapper>
          </SheetTrigger>
          <SheetContent side="right" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">

              {dashboardNavlinks.map(link => (
                <Fragment key={link.name}>
                  <Link href={link.path} className={link.className}>
                    <link.icon className={link.iconClassName} />
                    {link.name !== "Home" && link.name}
                  </Link>
                </Fragment>
              ))}
              <div className="">
                <ThemeToggler />
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-transparent pl-8 md:w-[200px] lg:w-[320px] border border-solid"
          />
        </div>
      </header>
    </>
  )
}

export default DashBoardHeader
