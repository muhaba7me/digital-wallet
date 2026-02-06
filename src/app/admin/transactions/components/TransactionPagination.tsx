"use client";

import { FC } from "react";
import { Button } from "@/components/shared/button";

interface Props {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}

export const TransactionPagination: FC<Props> = ({ current, total, onPageChange }) => (
  <div className="flex items-center justify-between pt-6">
    <p className="text-sm text-gray-500">
      Page {current} of {total}
    </p>
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={() => onPageChange(current - 1)} disabled={current === 1}>
        Previous
      </Button>
      {Array.from({ length: total }).map((_, idx) => (
        <Button
          key={idx}
          variant={current === idx + 1 ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(idx + 1)}
        >
          {idx + 1}
        </Button>
      ))}
      <Button variant="outline" size="sm" onClick={() => onPageChange(current + 1)} disabled={current === total}>
        Next
      </Button>
    </div>
  </div>
);
