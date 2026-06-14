"use client";

import { useState } from "react";
import React from "react";
import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteResource } from "./_hooks/useDeleteResource";
import { cn } from "@/lib/utils";

interface DeleteModalProps {
  children?: React.ReactNode;
  deleteService: (resourceId: string | number) => Promise<void>;
  resourceId: string | number;
  queryKeysToInvalidate?: (readonly unknown[])[];
}

export function DeleteModal({
  children,
  deleteService,
  resourceId,
  queryKeysToInvalidate,
}: DeleteModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { loading, delete: deleteResource } = useDeleteResource({
    deleteService,
    resourceId,
    queryKeysToInvalidate,
    onSuccess: () => setIsOpen(false),
  });

  const handleDelete = () => {
    deleteResource();
  };

  const trigger = children ? (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    React.cloneElement(children as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOpen(true);
      },
    })
  ) : (
    <Button onClick={() => setIsOpen(true)} size="sm" variant="ghost">
      <Trash2 className="h-4 w-4" />
    </Button>
  );

  return (
    <>
      {trigger}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="border-t-0 bg-popover">
            <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={loading}
              onClick={handleDelete}
            >
              {loading ? (
                <>
                  <span
                    className={cn(
                      "mr-2 h-4 w-4",
                      "animate-spin rounded-full",
                      "border-2 border-current border-t-transparent",
                    )}
                  />
                </>
              ) : (
                "Excluir"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
