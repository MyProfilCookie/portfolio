"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [processing, setProcessing] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      console.log("Fetching messages...");
      const response = await fetch(`/api/contact?page=${page}&limit=10`);
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Received data:", data);
      setMessages(data.messages);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Erreur détaillée lors de la récupération des messages:", error);
      toast.error("Erreur lors de la récupération des messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered, page:", page);
    fetchMessages();
  }, [page]);

  const toggleReadStatus = async (id: string) => {
    try {
      setProcessing(id);
      const message = messages.find((m) => m.id === id);
      if (!message) return;

      const response = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: !message.read }),
      });

      if (response.ok) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id 
              ? { ...m, read: !m.read } 
              : m
          )
        );
        toast.success(`Message marqué comme ${message.read ? 'non lu' : 'lu'}`);
      } else {
        toast.error("Erreur lors de la mise à jour du statut");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      toast.error("Erreur lors de la mise à jour du statut");
    } finally {
      setProcessing(null);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) return;

    try {
      setProcessing(id);
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        toast.success("Message supprimé avec succès");
      } else {
        toast.error("Erreur lors de la suppression du message");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du message:", error);
      toast.error("Erreur lors de la suppression du message");
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Messages de contact</h1>
      
      <div className="grid gap-6">
        {messages.map((message) => (
          <Card key={message.id} className={message.read ? "opacity-75" : ""}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">
                Message de {message.name}
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  message.read 
                    ? "bg-gray-100 text-gray-800" 
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {message.read ? "Lu" : "Non lu"}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleReadStatus(message.id)}
                  disabled={processing === message.id}
                >
                  {processing === message.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : message.read ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMessage(message.id)}
                  disabled={processing === message.id}
                >
                  {processing === message.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{message.name}</span>
                  <span>{message.email}</span>
                  <span>
                    {format(new Date(message.createdAt), "PPp", { locale: fr })}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">{message.subject}</p>
                  <p className="text-sm whitespace-pre-line">{message.message}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-2">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Précédent
        </Button>
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
} 