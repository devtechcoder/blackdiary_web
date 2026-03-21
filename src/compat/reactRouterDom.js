"use client";

import React, { useMemo } from "react";
import NextLink from "next/link";
import { usePathname, useRouter, useParams as useNextParams, useSearchParams as useNextSearchParams } from "next/navigation";

const normalizeTo = (to) => {
  if (!to) return "/";
  if (typeof to === "string") return to;
  if (typeof to === "object") {
    const pathname = to.pathname || "/";
    const search = to.search || "";
    const hash = to.hash || "";
    return `${pathname}${search}${hash}`;
  }
  return String(to);
};

const parsePathParts = (url) => {
  const [pathAndQuery, hash = ""] = (url || "/").split("#");
  const [pathname = "/", search = ""] = pathAndQuery.split("?");
  return {
    pathname,
    search: search ? `?${search}` : "",
    hash: hash ? `#${hash}` : "",
  };
};

const mapOptionalParams = (pathname, params) => {
  if (params.id && Array.isArray(params.id)) {
    params.id = params.id[0];
  }

  if (params.user_name && Array.isArray(params.user_name)) {
    params.user_name = params.user_name[0];
  }

  if (params.type && Array.isArray(params.type)) {
    params.type = params.type[0];
  }

  if (params.params) {
    const raw = Array.isArray(params.params) ? params.params : [params.params];

    if (pathname.startsWith("/account/")) {
      params.username = raw[0];
      params.id = raw[1];
    } else {
      params.slug = raw[0];
      params.id = raw[1];
    }

    delete params.params;
  }

  return params;
};

export const BrowserRouter = ({ children }) => <>{children}</>;
export const Routes = ({ children }) => <>{children}</>;
export const Route = () => null;
export const Outlet = ({ children }) => <>{children}</>;

export const useNavigate = () => {
  const router = useRouter();

  return (to, options = {}) => {
    if (typeof to === "number") {
      if (typeof window !== "undefined") {
        window.history.go(to);
      }
      return;
    }

    const href = normalizeTo(to);
    if (options?.replace) {
      router.replace(href);
      return;
    }
    router.push(href);
  };
};

export const useLocation = () => {
  const pathname = usePathname() || "/";
  const searchParams = useNextSearchParams();
  const searchString = searchParams?.toString() || "";
  const asPath = searchString ? `${pathname}?${searchString}` : pathname;
  const { search, hash } = parsePathParts(asPath);

  return {
    pathname,
    search,
    hash,
    state: null,
    key: asPath,
  };
};

export const useParams = () => {
  const pathname = usePathname() || "/";
  const params = { ...(useNextParams() || {}) };
  return mapOptionalParams(pathname, params);
};

export const useSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const nextSearchParams = useNextSearchParams();
  const raw = nextSearchParams?.toString() || "";

  const searchParams = useMemo(() => new URLSearchParams(raw), [raw]);

  const setSearchParams = (nextValue, navigateOptions = {}) => {
    let nextSearch = "";

    if (typeof nextValue === "string") {
      nextSearch = nextValue.startsWith("?") ? nextValue.slice(1) : nextValue;
    } else if (nextValue instanceof URLSearchParams) {
      nextSearch = nextValue.toString();
    } else if (Array.isArray(nextValue)) {
      nextSearch = new URLSearchParams(nextValue).toString();
    } else if (nextValue && typeof nextValue === "object") {
      nextSearch = new URLSearchParams(nextValue).toString();
    }

    const href = nextSearch ? `${pathname}?${nextSearch}` : pathname;

    if (navigateOptions?.replace) {
      router.replace(href);
    } else {
      router.push(href);
    }
  };

  return [searchParams, setSearchParams];
};

export const Link = React.forwardRef(({ to, href, children, ...props }, ref) => {
  const finalHref = normalizeTo(href || to);
  return (
    <NextLink href={finalHref} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = "RouterLink";

export const NavLink = React.forwardRef(({ to, href, className, children, ...props }, ref) => {
  const pathname = usePathname() || "/";
  const finalHref = normalizeTo(href || to);
  const targetPath = parsePathParts(finalHref).pathname;
  const isActive = pathname === targetPath;

  const computedClassName = typeof className === "function" ? className({ isActive }) : className;

  return (
    <NextLink href={finalHref} ref={ref} className={computedClassName} {...props}>
      {typeof children === "function" ? children({ isActive }) : children}
    </NextLink>
  );
});

NavLink.displayName = "RouterNavLink";

export const Navigate = ({ to, replace = false }) => {
  const router = useRouter();

  React.useEffect(() => {
    const href = normalizeTo(to);
    if (replace) {
      router.replace(href);
    } else {
      router.push(href);
    }
  }, [router, to, replace]);

  return null;
};

export const createSearchParams = (init) => new URLSearchParams(init);
