import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Project, Technology } from "@prisma/client";

interface ProjectFormProps {
  project?: Project & {
    technologies: Technology[];
  };
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
}

export default function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-foreground">
          Titre
        </label>
        <Input
          id="title"
          name="title"
          defaultValue={project?.title || ""}
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-foreground">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          defaultValue={project?.description || ""}
          required
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-foreground">
          URL de l&apos;image
        </label>
        <Input
          id="imageUrl"
          name="imageUrl"
          defaultValue={project?.imageUrl || ""}
          required
        />
      </div>

      <div>
        <label htmlFor="githubUrl" className="block text-sm font-medium text-foreground">
          URL GitHub
        </label>
        <Input
          id="githubUrl"
          name="githubUrl"
          defaultValue={project?.githubUrl || ""}
        />
      </div>

      <div>
        <label htmlFor="liveUrl" className="block text-sm font-medium text-foreground">
          URL du site en direct
        </label>
        <Input
          id="liveUrl"
          name="liveUrl"
          defaultValue={project?.liveUrl || ""}
        />
      </div>

      <div>
        <label htmlFor="order" className="block text-sm font-medium text-foreground">
          Ordre d&apos;affichage
        </label>
        <Input
          id="order"
          name="order"
          type="number"
          defaultValue={project?.order || 0}
          required
        />
      </div>

      <div className="flex items-center">
        <input
          id="featured"
          name="featured"
          type="checkbox"
          defaultChecked={project?.featured || false}
          className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
        />
        <label htmlFor="featured" className="ml-2 block text-sm text-foreground">
          Projet mis en avant
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">
          {project ? "Modifier" : "Créer"}
        </Button>
      </div>
    </form>
  );
} 