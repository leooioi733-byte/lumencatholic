import { ImageOff } from "lucide-react";
import { useState } from "react";
import type { MuseumExhibit } from "@/lib/museum-types";
import { cn } from "@/lib/utils";

export function MuseumImage({ exhibit, className, eager = false }: {
  exhibit: MuseumExhibit;
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={cn("flex aspect-[4/3] items-center justify-center overflow-hidden bg-muted", className)}>
      {failed ? (
        <div className="flex flex-col items-center gap-2 p-4 text-center text-sm text-muted-foreground" role="status">
          <ImageOff className="h-7 w-7" aria-hidden="true" />
          <span>Imagem indisponível no momento</span>
        </div>
      ) : (
        <img src={exhibit.image.url} alt={exhibit.image.alt} loading={eager ? "eager" : "lazy"}
          decoding="async" width={1000} height={750} onError={() => setFailed(true)}
          className="h-full w-full object-contain" />
      )}
    </div>
  );
}