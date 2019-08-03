import * as React from "react";

export function genId<T>(prefix: string): string;
export function makeId<T>(id: number, index: number): string;
export function assignRef<T>(ref: T, value: T): T;
export function mergeRefs<T>(refs: T, value: T): T;
export function getFocusables<T>(element: React.ReactNode, keyboardOnly: boolean): T;