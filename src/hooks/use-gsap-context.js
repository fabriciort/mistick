import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * A wrapper around gsap.context for proper cleanup in React.
 * @param {gsap.ContextFunc} func - The GSAP animation function
 * @param {React.DependencyList} [deps] - Dependencies array
 * @returns {React.MutableRefObject} - The scope ref to be attached to the container
 */
export const useGsapContext = (func, deps = []) => {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(func, scope);
    return () => ctx.revert();
  }, deps);

  return scope;
};
