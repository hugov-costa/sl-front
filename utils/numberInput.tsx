import { useCallback, useMemo, useState } from "react";

type UseNumberMaskReturn = {
  value: string;
  numericValue: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setRaw: (raw: number) => void;
};

export function useNumberMask(
  maxChars: number,
  decimals = 0,
  maxValue: number | null = null,
): UseNumberMaskReturn {
  const [digits, setDigits] = useState("");

  const clampDigits = useCallback(
    (d: string) => {
      if (d.length > maxChars) d = d.slice(0, maxChars);

      if (d === "") return d;

      if (decimals === 0) {
        const asInt = parseInt(d, 10);
        d = isNaN(asInt) ? "0" : String(asInt);
      }

      const num =
        decimals > 0
          ? parseInt(d, 10) / Math.pow(10, decimals)
          : parseInt(d, 10);

      if (maxValue !== null && num > maxValue) {
        const capped = Math.floor(maxValue * Math.pow(10, decimals)).toString();

        return capped.length > maxChars ? capped.slice(0, maxChars) : capped;
      }

      return d;
    },
    [decimals, maxChars, maxValue],
  );

  const format = useCallback(
    (d: string) => {
      if (decimals > 0) {
        const padded = d.padStart(decimals + 1, "0");
        const intPart = padded.slice(0, -decimals) || "0";
        const frac = padded.slice(-decimals);

        return `${parseInt(intPart, 10)},${frac}`;
      }

      return d || "";
    },
    [decimals],
  );

  const numericValue = useMemo(() => {
    if (!digits) return 0;

    return decimals > 0
      ? parseInt(digits, 10) / Math.pow(10, decimals)
      : parseInt(digits, 10);
  }, [digits, decimals]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const incoming = e.target.value;
      const only = incoming.replace(/\D/g, "");
      const clamped = clampDigits(only);

      setDigits(clamped);
    },
    [clampDigits],
  );

  const setRaw = useCallback(
    (raw: number) => {
      if (isNaN(raw)) return;

      const shifted =
        decimals > 0
          ? Math.round(raw * Math.pow(10, decimals))
          : Math.round(raw);
      let shiftedString = Math.abs(shifted).toString();
      shiftedString = clampDigits(shiftedString);

      setDigits(shiftedString);
    },
    [clampDigits, decimals],
  );

  return {
    value: format(digits),
    numericValue,
    onChange,
    setRaw,
  };
}
