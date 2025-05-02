
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

const VerifyCodePage = () => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    if (!storedEmail) {
      navigate("/login");
      return;
    }
    setEmail(storedEmail);
    
    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate]);
  
  const handleResendCode = () => {
    if (countdown > 0) return;
    
    setIsResending(true);
    
    // Simulate resending code
    setTimeout(() => {
      setIsResending(false);
      setCountdown(60);
      
      // Store a new verification code
      sessionStorage.setItem("verificationCode", "123456");
      
      toast({
        title: "验证码已重新发送",
        description: "请检查您的邮箱",
      });
      
      // Restart countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };
  
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.length !== 6) {
      toast({
        variant: "destructive",
        title: "请输入6位验证码",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate verification
    setTimeout(() => {
      const storedCode = sessionStorage.getItem("verificationCode");
      
      if (code === storedCode) {
        // Success
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("userData", JSON.stringify({
          email: email,
          username: email.split("@")[0],
          avatar: "",
          createdAt: new Date().toISOString()
        }));
        
        setIsSubmitting(false);
        toast({
          title: "登录成功",
          description: "欢迎回来",
        });
        
        navigate("/profile");
      } else {
        // Error
        setIsSubmitting(false);
        toast({
          variant: "destructive",
          title: "验证码错误",
          description: "请重新输入",
        });
      }
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-heritage-cream flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 flex items-center shadow-sm">
        <Link to="/login" className="p-2">
          <ArrowLeft size={24} />
        </Link>
        <div className="flex-1 text-center">
          <h1 className="text-lg font-bold">验证码</h1>
        </div>
        <div className="w-10"></div>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8 border border-heritage-gold/10">
          <div className="text-center mb-6">
            <h2 className="text-xl font-medium mb-1">输入验证码</h2>
            <p className="text-sm text-gray-500">验证码已发送至 <span className="text-heritage-text font-medium">{email}</span></p>
          </div>
          
          <form onSubmit={handleVerifyCode}>
            <div className="space-y-6">
              <div>
                <Input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 6) {
                      setCode(value);
                    }
                  }}
                  className="w-full text-center text-2xl tracking-[1em] font-medium border-heritage-gold/30 bg-heritage-paper"
                  placeholder="______"
                  maxLength={6}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-heritage-red hover:bg-heritage-red/90"
                disabled={code.length !== 6 || isSubmitting}
              >
                {isSubmitting ? "验证中..." : "验证"}
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={handleResendCode}
              disabled={countdown > 0 || isResending}
              className={`text-sm ${countdown > 0 ? 'text-gray-400' : 'text-heritage-teal'}`}
            >
              {isResending 
                ? "发送中..." 
                : countdown > 0 
                  ? `${countdown}秒后可重新发送` 
                  : "重新发送验证码"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCodePage;
