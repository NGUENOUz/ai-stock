import React, { useState } from "react";
import Image from "next/image";
import { Send, Heart, Reply } from "lucide-react";
import { cn } from "@/lib/utils";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  likes: number;
}

interface CommentSectionProps {
  postId: string;
  initialComments: Comment[];
  isOpen: boolean;
}

export default function CommentSection({ postId, initialComments, isOpen }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: "Vous", // Mocked current user
        avatar: "https://i.pravatar.cc/150?u=current_user",
      },
      content: newComment,
      createdAt: "À l'instant",
      likes: 0,
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const toggleLike = (commentId: string) => {
    setLikedComments(prev => {
      const next = new Set(prev);
      if (next.has(commentId)) {
        next.delete(commentId);
      } else {
        next.add(commentId);
      }
      return next;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="border-t border-slate-100 dark:border-slate-800 p-4 bg-slate-50/50 dark:bg-slate-900/50">
      <form onSubmit={handleAddComment} className="flex gap-3 mb-6">
        <Image 
          src="https://i.pravatar.cc/150?u=current_user" 
          alt="Vous" 
          width={32} 
          height={32} 
          className="rounded-full w-8 h-8 object-cover shrink-0" 
        />
        <div className="relative flex-1">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-primary transition-colors"
          />
          <button 
            type="submit"
            disabled={!newComment.trim()}
            className="absolute right-1.5 top-1.5 bottom-1.5 p-1.5 bg-primary text-white rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary transition-all"
          >
            <Send className="w-3 h-3" />
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-center text-sm text-slate-500 py-4">Aucun commentaire pour le moment. Soyez le premier !</p>
        ) : (
          comments.map(comment => {
            const isLiked = likedComments.has(comment.id);
            return (
              <div key={comment.id} className="flex gap-3 group">
                <Image 
                  src={comment.author.avatar} 
                  alt={comment.author.name} 
                  width={32} 
                  height={32} 
                  className="rounded-full w-8 h-8 object-cover shrink-0" 
                />
                <div className="flex-1">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-none p-3 shadow-sm border border-slate-100 dark:border-slate-700/50 inline-block">
                    <div className="flex justify-between items-baseline gap-4 mb-1">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{comment.author.name}</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{comment.content}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-1.5 ml-2 text-xs font-medium text-slate-500">
                    <span>{comment.createdAt}</span>
                    <button 
                      onClick={() => toggleLike(comment.id)}
                      className={cn("hover:text-red-500 transition-colors flex items-center gap-1", isLiked && "text-red-500")}
                    >
                      <Heart className={cn("w-3.5 h-3.5", isLiked && "fill-current")} />
                      {(comment.likes + (isLiked ? 1 : 0)) > 0 && (
                        <span>{comment.likes + (isLiked ? 1 : 0)}</span>
                      )}
                    </button>
                    <button className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                      Répondre
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
