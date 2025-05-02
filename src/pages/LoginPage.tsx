
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !email.includes('@')) {
      toast({
        variant: "destructive",
        title: "请输入有效的邮箱地址",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate sending verification code
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Store email in sessionStorage
      sessionStorage.setItem("userEmail", email);
      
      // Store verification code (in a real app this would be sent to the user's email)
      // 模拟验证码 - 在实际应用中应通过邮件发送
      sessionStorage.setItem("verificationCode", "123456");
      
      toast({
        title: "验证码已发送",
        description: "请检查您的邮箱",
      });
      
      // Navigate to verification page
      navigate("/verify");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-heritage-cream flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 flex items-center shadow-sm">
        <Link to="/" className="p-2">
          <ArrowLeft size={24} />
        </Link>
        <div className="flex-1 text-center">
          <h1 className="text-lg font-bold">登录</h1>
        </div>
        <div className="w-10"></div>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8 border border-heritage-gold/10">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-heritage-paper border border-heritage-gold/30 mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl font-song text-heritage-red">非遗</span>
            </div>
            <h2 className="text-2xl font-song mb-1 text-heritage-text">非遗AI探秘</h2>
            <p className="text-sm text-gray-500">登录以体验更多功能</p>
          </div>
          
          <form onSubmit={handleSendCode}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-heritage-text mb-1">
                  邮箱
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="请输入您的邮箱"
                  className="w-full border-heritage-gold/30 bg-heritage-paper"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-heritage-red hover:bg-heritage-red/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "发送中..." : "发送验证码"}
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>登录即代表您同意</p>
            <p className="text-heritage-teal">《用户协议》和《隐私政策》</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
