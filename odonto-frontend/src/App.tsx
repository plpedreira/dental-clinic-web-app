import React, { useState, useEffect } from 'react';
import { Moon, Sun, ShieldCheck, Sparkles, HeartPulse } from 'lucide-react';

interface AppointmentFormData {
  name: string;
  phone: string;
  email: string;
  birthDate: string;
  healthInsurance: string;
  service: string;
  notes: string;
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<AppointmentFormData>({
    name: '',
    phone: '',
    email: '',
    birthDate: '',
    healthInsurance: 'nao',
    service: '',
    notes: '',
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 85;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3333/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao registrar agendamento.');
      }

      const telefoneDestino = '5511943200057';
      let texto = `*NOVO PEDIDO DE AGENDAMENTO - SITE*\n\n`;
      texto += `*Nome:* ${formData.name}\n`;
      texto += `*Telefone:* ${formData.phone}\n`;
      texto += `*E-mail:* ${formData.email}\n`;
      texto += `*Nascimento:* ${formData.birthDate}\n`;
      texto += `*Plano Odontológico:* ${formData.healthInsurance.toUpperCase()}\n`;
      texto += `*Motivo Principal:* ${formData.service.toUpperCase()}\n\n`;
      texto += `*Observações:*\n${formData.notes || 'Nenhuma.'}`;

      const linkWhatsApp = `https://wa.me/${telefoneDestino}?text=${encodeURIComponent(texto)}`;
      window.open(linkWhatsApp, '_blank');

      alert('Solicitação enviada com sucesso!');
      setFormData({
        name: '',
        phone: '',
        email: '',
        birthDate: '',
        healthInsurance: 'nao',
        service: '',
        notes: '',
      });
    } catch (error) {
      console.error(error);
      alert('Erro ao processar agendamento. Verifique se o servidor backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav>
        <div className="logo" onClick={(e) => scrollToSection(e as any, 'home')} style={{ cursor: 'pointer' }}>
          Sorriso <span>Perfeito</span>
        </div>
        <div className="menu">
          <a href="#home" onClick={(e) => scrollToSection(e, 'home')}>Home</a>
          <a href="#sobre" onClick={(e) => scrollToSection(e, 'sobre')}>Sobre</a>
          <a href="#resultados" onClick={(e) => scrollToSection(e, 'resultados')}>Resultados</a>
          <a href="#contato" onClick={(e) => scrollToSection(e, 'contato')}>Contato</a>
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            {theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <header id="home">
        <div className="hero-content">
          <h1>Clínica Sorriso Perfeito</h1>
          <p>Cuidando do seu sorriso com carinho, elegância e tecnologia de ponta.</p>
          <button className="btn-hero" onClick={(e) => scrollToSection(e as any, 'contato')}>
            Agendar Avaliação
          </button>
        </div>
      </header>

      {/* Sobre */}
      <section id="sobre">
        <div className="section-container">
          <h2>Sobre a Nossa Clínica</h2>
          <p className="about-text">
            Oferecemos tratamentos modernos e confortáveis, com atendimento personalizado para devolver a você a confiança de um sorriso saudável e bonito.
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <Sparkles className="icon" size={32} />
              <h3>Tecnologia Avançada</h3>
              <p>Equipamentos de última geração para exames e tratamentos rápidos e indolores.</p>
            </div>
            <div className="feature-card">
              <HeartPulse className="icon" size={32} />
              <h3>Atendimento Humanizado</h3>
              <p>Cuidado dedicado e ambiente acolhedor do início ao fim da sua consulta.</p>
            </div>
            <div className="feature-card">
              <ShieldCheck className="icon" size={32} />
              <h3>Segurança Garantida</h3>
              <p>Rígidos protocolos de biossegurança e os melhores materiais do mercado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados */}
      <section id="resultados">
        <div className="section-container">
          <h2>Resultados Transformadores</h2>
          <div className="galeria">
            <div className="card">
              <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80" alt="Clareamento Dental" />
              <p>Tratamento estético completo com clareamento dental de alta precisão.</p>
            </div>
            <div className="card">
              <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80" alt="Alinhamento" />
              <p>Correção de alinhamento com tecnologia moderna e invisível.</p>
            </div>
            <div className="card">
              <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80" alt="Implantes" />
              <p>Implantes de alta durabilidade e acabamento natural.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contato / Formulário */}
      <section id="contato">
        <div className="section-container">
          <h2>Agende Sua Avaliação Gratuita</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Seu Nome Completo *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Digite seu nome completo" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Telefone (WhatsApp) *</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="(11) 99999-9999" />
              </div>
              <div className="form-group">
                <label>Seu E-mail *</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="seu@email.com" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Data de Nascimento *</label>
                <input type="date" name="birthDate" required value={formData.birthDate} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Possui Plano Odontológico?</label>
                <select name="healthInsurance" value={formData.healthInsurance} onChange={handleChange}>
                  <option value="nao">Não</option>
                  <option value="sim">Sim</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Qual o principal motivo do agendamento? *</label>
              <select name="service" required value={formData.service} onChange={handleChange}>
                <option value="">Selecione um serviço</option>
                <option value="Avaliação">Avaliação</option>
                <option value="Clareamento">Clareamento</option>
                <option value="Aparelho">Aparelho</option>
                <option value="Implantes">Implantes</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div className="form-group">
              <label>Observações</label>
              <textarea rows={3} name="notes" value={formData.notes} onChange={handleChange} placeholder="Conte sua principal dúvida..." />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Pedido de Agendamento'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>©2025 Clínica Sorriso Perfeito - Todos os direitos reservados.</p>
        <p className="credits">Feito por: Pedro Lucas Araujo Pedreira</p>
      </footer>
    </div>
  );
}