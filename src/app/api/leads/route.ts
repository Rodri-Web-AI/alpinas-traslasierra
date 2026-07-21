import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nombre,
      apellido,
      email,
      whatsapp,
      localidad,
      metros,
      calidad,
      mensaje,
      presupuestoMinUSD,
      presupuestoMaxUSD,
      presupuestoMinARS,
      presupuestoMaxARS,
    } = body;

    // 1. Guardar en Supabase
    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert([
        {
          nombre,
          apellido,
          email,
          whatsapp,
          localidad,
          metros,
          calidad,
          mensaje,
          presupuesto_min_usd: presupuestoMinUSD,
          presupuesto_max_usd: presupuestoMaxUSD,
          presupuesto_min_ars: presupuestoMinARS,
          presupuesto_max_ars: presupuestoMaxARS,
        },
      ])
      .select();

    if (error) {
      console.error('Error guardando en Supabase:', error);
      throw error;
    }

    // Cálculos para el email (Anticipo 40% y Cuotas 60% / 12)
    const anticipoMin = Math.round(presupuestoMinARS * 0.4);
    const anticipoMax = Math.round(presupuestoMaxARS * 0.4);
    const cuotaMin = Math.round((presupuestoMinARS * 0.6) / 12);
    const cuotaMax = Math.round((presupuestoMaxARS * 0.6) / 12);

    // 2. Enviar email de bienvenida al cliente (Mismo mensaje, solo cambia el bloque de precios)
    await resend.emails.send({
      from: 'Alpinas Traslasierra <onboarding@resend.dev>',
      to: [email],
      subject: '¡Gracias por contactar a Alpinas Traslasierra! 🏔️',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #c5a073;">¡Hola ${nombre}! 👋</h2>
          
          <p>Gracias por usar nuestra calculadora de presupuesto. Recibimos tu consulta para construir una cabaña de <strong>${metros} m²</strong> en <strong>${localidad}</strong>.</p>
          
          <!-- BLOQUE MODIFICADO: Solo muestra Anticipo y Cuotas -->
          <div style="background: #f0f0f0; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #2d3748; margin-top: 0; text-align: center;">📊 Tu plan de financiamiento:</h3>
            
            <div style="display: flex; gap: 15px; margin-top: 15px;">
              <div style="flex: 1; background: white; padding: 15px; border-radius: 8px; text-align: center; border: 1px solid #e2e8f0;">
                <p style="margin: 0; font-size: 12px; color: #718096; font-weight: 600; text-transform: uppercase;">Anticipo (40%)</p>
                <p style="margin: 8px 0 0; font-size: 18px; font-weight: bold; color: #c5a073;">
                  $${anticipoMin.toLocaleString('es-AR')} - $${anticipoMax.toLocaleString('es-AR')}
                </p>
              </div>
              <div style="flex: 1; background: white; padding: 15px; border-radius: 8px; text-align: center; border: 1px solid #e2e8f0;">
                <p style="margin: 0; font-size: 12px; color: #718096; font-weight: 600; text-transform: uppercase;">12 cuotas s/interés</p>
                <p style="margin: 8px 0 0; font-size: 18px; font-weight: bold; color: #c5a073;">
                  $${cuotaMin.toLocaleString('es-AR')} - $${cuotaMax.toLocaleString('es-AR')}/mes
                </p>
              </div>
            </div>
          </div>
          <!-- FIN BLOQUE MODIFICADO -->

          <p><strong>Calidad seleccionada:</strong> ${calidad}</p>
          
          <h3 style="color: #2d3748;">¿Qué sigue ahora? </h3>
          <ol style="line-height: 1.8;">
            <li>Te contactaremos en menos de 24 horas por WhatsApp o email</li>
            <li>Coordinamos una llamada sin compromiso para conocer tu proyecto</li>
            <li>Si tenés terreno, lo analizamos y te damos recomendaciones</li>
            <li>Te coordinamos una visita a obras terminadas</li>
          </ol>

          <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <p style="margin: 0; color: #065f46;">
              <strong>💡 Consejo:</strong> Mientras tanto, podés visitarnos en Villa Dolores o escribirnos directamente por WhatsApp para agilizar el proceso.
            </p>
          </div>

          <p style="margin-top: 30px; color: #718096; font-size: 14px;">
            Cualquier duda, respondé este email o escribinos al WhatsApp.<br>
            <strong>Alpinas Traslasierra</strong><br>
            Construcción artesanal en las sierras de Córdoba
          </p>
        </div>
      `,
    });

    // 3. Enviar notificación a tu email (También actualizado para no mostrar el total)
    await resend.emails.send({
      from: 'Alpinas Traslasierra <onboarding@resend.dev>',
      to: ['alpinastraslasierra@gmail.com'], 
      subject: `🔔 Nuevo lead: ${nombre} ${apellido} - ${localidad}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #c5a073;">🎯 Nuevo Lead Captado</h2>
          
          <div style="background: #f0f0f0; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Datos del cliente:</h3>
            <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>WhatsApp:</strong> ${whatsapp || 'No especificado'}</p>
            <p><strong>Localidad:</strong> ${localidad}</p>
            
            <h3 style="color: #2d3748;">Detalles del proyecto:</h3>
            <p><strong>Superficie:</strong> ${metros} m²</p>
            <p><strong>Calidad:</strong> ${calidad}</p>
            <p><strong>Anticipo (40%):</strong> $${anticipoMin.toLocaleString('es-AR')} - $${anticipoMax.toLocaleString('es-AR')} ARS</p>
            <p><strong>12 cuotas s/interés:</strong> $${cuotaMin.toLocaleString('es-AR')} - $${cuotaMax.toLocaleString('es-AR')} ARS/mes</p>
            ${mensaje ? `<p><strong>Mensaje:</strong> ${mensaje}</p>` : ''}
          </div>

          <p style="color: #718096; font-size: 14px;">
            Lead guardado en Supabase el ${new Date().toLocaleString('es-AR')}
          </p>
        </div>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      data,
      message: 'Lead guardado y emails enviados' 
    });

  } catch (error) {
    console.error('Error en API route:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error al guardar el lead' 
      },
      { status: 500 }
    );
  }
}