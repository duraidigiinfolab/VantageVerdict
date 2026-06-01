'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { formatDate } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user: {
    display_name: string;
    avatar_url: string | null;
  };
}

interface PostCommentsProps {
  postId: string;
  initialComments: Comment[];
}

export default function PostComments({ postId, initialComments }: PostCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push('/auth/login');
      return;
    }
    
    if (!newComment.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const { data: userData } = await supabase.from('users').select('display_name, avatar_url').eq('id', user.id).single();
      
      const { data, error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          user_id: user.id,
          content: newComment,
          is_approved: true // Default to true for now
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Optimistically add to UI
      const newCommentObj: Comment = {
        id: data.id,
        content: data.content,
        created_at: data.created_at,
        user: {
          display_name: userData?.display_name || 'User',
          avatar_url: userData?.avatar_url || null
        }
      };
      
      setComments([...comments, newCommentObj]);
      setNewComment('');
      router.refresh();
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="comments-section" style={{ maxWidth: '100%' }} id="comments">
      <h3 className="comments-title">
        <MessageCircle size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />
        Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          className="textarea-field"
          placeholder={user ? "Share your thoughts on this review..." : "Sign in to leave a comment..."}
          rows={3}
          id="comment-input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={!user || isSubmitting}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
          {!user && (
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>
              You must be signed in to comment.
            </span>
          )}
          <button 
            type={user ? "submit" : "button"} 
            className="btn btn-primary btn-md" 
            style={{ marginLeft: 'auto' }}
            disabled={(!user && false) || isSubmitting || (!newComment.trim() && user)}
            onClick={() => !user && router.push('/auth/login')}
          >
            {user ? (isSubmitting ? 'Posting...' : 'Post Comment') : 'Sign In to Comment'}
          </button>
        </div>
      </form>

      {/* Comment List */}
      <div className="comment-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            <Avatar name={comment.user?.display_name || 'User'} size="sm" />
            <div className="comment-body">
              <div className="comment-header">
                <span className="comment-author">{comment.user?.display_name}</span>
                <span className="comment-time">{formatDate(comment.created_at)}</span>
              </div>
              <p className="comment-content">{comment.content}</p>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--color-text-tertiary)', padding: '32px 0' }}>
            No comments yet. Be the first to share your thoughts!
          </p>
        )}
      </div>
    </div>
  );
}
