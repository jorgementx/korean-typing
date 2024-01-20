import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
