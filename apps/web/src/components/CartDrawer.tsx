'use client';

import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Store,
  Truck,
  MessageCircle,
  Copy,
  Check,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button, Input } from '@repo/ui';
import { formatEuro } from '@repo/shared';

export const CartDrawer: React.FC = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    isDrawerOpen,
    setIsDrawerOpen,
    total,
  } = useCart();

  // Paso del proceso: 1 = Cesta & Entrega, 2 = Datos & Pago, 3 = Confirmación Exitosa
  const [paso, setPaso] = useState<1 | 2 | 3>(1);
  const [tipoEntrega, setTipoEntrega] = useState<'tienda' | 'envio'>('tienda');
  const [metodoPago, setMetodoPago] = useState<'bizum' | 'tienda'>('bizum');

  // Formulario del cliente
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [notas, setNotas] = useState('');

  // Estados de proceso
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [pedidoConfirmado, setPedidoConfirmado] = useState<{
    numeroPedido: string;
    total: number;
  } | null>(null);
  const [copiado, setCopiado] = useState(false);

  if (!isDrawerOpen) return null;

  const costeEnvio = tipoEntrega === 'envio' ? (total >= 50 ? 0 : 4.95) : 0;
  const totalConEnvio = Math.round((total + costeEnvio) * 100) / 100;

  const handleCerrar = () => {
    setIsDrawerOpen(false);
    if (paso === 3) {
      setPaso(1);
      setPedidoConfirmado(null);
    }
  };

  const handlePasoSiguiente = () => {
    if (items.length === 0) return;
    setPaso(2);
  };

  const handleConfirmarPedido = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!nombre.trim() || !email.trim() || !telefono.trim()) {
      setErrorMsg('Por favor completa tu nombre, email y teléfono de contacto.');
      return;
    }

    if (tipoEntrega === 'envio' && (!direccion.trim() || !ciudad.trim() || !codigoPostal.trim())) {
      setErrorMsg('Para entrega a domicilio requerimos dirección completa y código postal.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clienteNombre: nombre.trim(),
          clienteEmail: email.trim(),
          clienteTelefono: telefono.trim(),
          entregaTipo: tipoEntrega,
          direccion: tipoEntrega === 'envio' ? direccion.trim() : null,
          ciudad: tipoEntrega === 'envio' ? ciudad.trim() : null,
          codigoPostal: tipoEntrega === 'envio' ? codigoPostal.trim() : null,
          metodoPago,
          total: totalConEnvio,
          items: items.map((i) => ({
            productoId: i.id,
            nombre: i.nombre,
            precioUnitario: i.precio,
            cantidad: i.cantidad,
            subtotal: Math.round(i.precio * i.cantidad * 100) / 100,
          })),
          notas: notas.trim() || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Ocurrió un error al procesar el pedido.');
      }

      setPedidoConfirmado({
        numeroPedido: data.numeroPedido,
        total: totalConEnvio,
      });

      clearCart();
      setPaso(3);
    } catch (err: any) {
      console.error('Error al tramitar pedido:', err);
      setErrorMsg(err.message || 'Error de conexión al tramitar el pedido.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copiarNumeroPedido = () => {
    if (pedidoConfirmado?.numeroPedido) {
      navigator.clipboard.writeText(pedidoConfirmado.numeroPedido);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop con blur suave */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={handleCerrar}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zen-crema shadow-2xl flex flex-col border-l border-stone-200/80 animate-in slide-in-from-right duration-300">
          {/* Cabecera del Drawer */}
          <div className="px-6 py-5 border-b border-stone-200/80 bg-white/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-zen-bosque-700" />
              <h2 className="font-serif font-bold text-lg text-zen-bosque-900">
                {paso === 1 && 'Tu Cesta de Bienestar'}
                {paso === 2 && 'Finalizar Pedido (Paso 2/2)'}
                {paso === 3 && '¡Pedido Recibido!'}
              </h2>
            </div>
            <button
              onClick={handleCerrar}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* CUERPO DEL DRAWER SEGÚN PASO */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* PASO 1: REVISIÓN DE ITEMS Y ENTREGA */}
            {paso === 1 && (
              <>
                {items.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                    <p className="text-stone-600 font-medium">Tu cesta está vacía</p>
                    <p className="text-xs text-stone-400 max-w-xs mx-auto">
                      Explora nuestros minerales, sahumerios y velas para comenzar tu pedido.
                    </p>
                    <Button
                      variant="zen"
                      size="sm"
                      onClick={() => setIsDrawerOpen(false)}
                      className="mt-4"
                    >
                      Ver Catálogo
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Lista de Artículos */}
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200 shadow-sm"
                        >
                          {item.imagenUrl ? (
                            <img
                              src={item.imagenUrl}
                              alt={item.nombre}
                              className="w-14 h-14 rounded-lg object-cover bg-stone-100 shrink-0"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-lg bg-stone-100 flex items-center justify-center shrink-0 text-stone-400">
                              <ShoppingBag className="w-6 h-6" />
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-zen-bosque-900 truncate">
                              {item.nombre}
                            </h4>
                            <p className="text-xs font-serif font-bold text-zen-bosque-700 mt-0.5">
                              {formatEuro(item.precio)}
                            </p>

                            {/* Controles de Cantidad */}
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                                className="w-6 h-6 rounded-md bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-semibold text-stone-800 w-5 text-center">
                                {item.cantidad}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                                className="w-6 h-6 rounded-md bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg transition-colors shrink-0"
                            title="Eliminar artículo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Selector de Modalidad de Entrega */}
                    <div className="pt-4 border-t border-stone-200">
                      <label className="text-xs font-semibold text-stone-700 block mb-2">
                        Modalidad de Entrega:
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setTipoEntrega('tienda')}
                          className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                            tipoEntrega === 'tienda'
                              ? 'border-zen-bosque-500 bg-zen-bosque-50/70 text-zen-bosque-900 shadow-sm'
                              : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Store className="w-4 h-4 text-zen-bosque-600" />
                            <span className="text-xs font-bold">Recogida en Boiro</span>
                          </div>
                          <span className="text-[11px] text-emerald-600 font-medium">¡Gratis!</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setTipoEntrega('envio')}
                          className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                            tipoEntrega === 'envio'
                              ? 'border-zen-bosque-500 bg-zen-bosque-50/70 text-zen-bosque-900 shadow-sm'
                              : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Truck className="w-4 h-4 text-zen-bosque-600" />
                            <span className="text-xs font-bold">Envío 24-48h</span>
                          </div>
                          <span className="text-[11px] text-stone-500">
                            {total >= 50 ? (
                              <span className="text-emerald-600 font-medium">Gratis (&gt;50€)</span>
                            ) : (
                              '4,95 €'
                            )}
                          </span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {/* PASO 2: DATOS DEL COMPRADOR & PAGO */}
            {paso === 2 && (
              <form id="order-form" onSubmit={handleConfirmarPedido} className="space-y-4">
                <div className="p-3 bg-zen-bosque-50 rounded-xl border border-zen-bosque-200 text-xs text-zen-bosque-900">
                  Modalidad:{' '}
                  <strong>
                    {tipoEntrega === 'tienda' ? 'Recogida en tienda (Boiro)' : 'Envío a domicilio'}
                  </strong>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-rose-50 text-rose-700 rounded-xl text-xs font-medium border border-rose-200">
                    {errorMsg}
                  </div>
                )}

                <Input
                  label="Nombre y Apellidos *"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre completo"
                  required
                />

                <Input
                  label="Correo Electrónico *"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@ejemplo.com"
                  required
                />

                <Input
                  label="Teléfono / WhatsApp *"
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="600 000 000"
                  helperText="Para avisarte cuando tu pedido esté listo o enviarte el seguimiento."
                  required
                />

                {tipoEntrega === 'envio' && (
                  <>
                    <Input
                      label="Dirección de Envío *"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      placeholder="Calle, número, piso..."
                      required
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Ciudad / Población *"
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                        placeholder="Boiro, etc."
                        required
                      />
                      <Input
                        label="Código Postal *"
                        value={codigoPostal}
                        onChange={(e) => setCodigoPostal(e.target.value)}
                        placeholder="15930"
                        required
                      />
                    </div>
                  </>
                )}

                {/* Método de Pago */}
                <div className="pt-2">
                  <label className="text-xs font-semibold text-stone-700 block mb-2">
                    Forma de Pago:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setMetodoPago('bizum')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        metodoPago === 'bizum'
                          ? 'border-emerald-500 bg-emerald-50/60 text-emerald-900 shadow-sm'
                          : 'border-stone-200 bg-white text-stone-600'
                      }`}
                    >
                      <span className="text-xs font-bold block">Bizum Directo</span>
                      <span className="text-[10px] text-stone-500">Pago instantáneo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMetodoPago('tienda')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        metodoPago === 'tienda'
                          ? 'border-zen-bosque-500 bg-zen-bosque-50/60 text-zen-bosque-900 shadow-sm'
                          : 'border-stone-200 bg-white text-stone-600'
                      }`}
                    >
                      <span className="text-xs font-bold block">En Tienda</span>
                      <span className="text-[10px] text-stone-500">Efectivo / Tarjeta</span>
                    </button>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-stone-700">
                    Notas o Dedicatoria de Regalo (opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={notas}
                    onChange={(e) => setNotas(e.target.value)}
                    placeholder="Instrucciones para la entrega o preparación para regalo..."
                    className="w-full bg-white text-stone-800 text-xs rounded-xl border border-stone-300 p-2.5 focus:outline-none focus:border-zen-bosque-500 focus:ring-2 focus:ring-zen-bosque-500/20"
                  />
                </div>
              </form>
            )}

            {/* PASO 3: CONFIRMACIÓN EXITOSA */}
            {paso === 3 && pedidoConfirmado && (
              <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-xs uppercase text-zen-dorado-700 font-bold tracking-wider">
                    Confirmación de Compra
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-zen-bosque-900 mt-1">
                    ¡Gracias por tu pedido!
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Hemos registrado tu encargo en nuestro templo de Boiro.
                  </p>
                </div>

                {/* Caja de Referencia */}
                <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-sm text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-500">Identificador Oficial:</span>
                    <button
                      onClick={copiarNumeroPedido}
                      className="inline-flex items-center gap-1 text-[11px] text-zen-bosque-600 hover:text-zen-bosque-800 font-medium"
                    >
                      {copiado ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiado ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>
                  <p className="font-mono text-xl font-bold text-zen-bosque-900">
                    {pedidoConfirmado.numeroPedido}
                  </p>
                  <div className="pt-2 border-t border-stone-100 flex justify-between text-xs font-semibold">
                    <span className="text-stone-600">Total a abonar:</span>
                    <span className="text-zen-bosque-900 font-serif text-sm">
                      {formatEuro(pedidoConfirmado.total)}
                    </span>
                  </div>
                </div>

                {/* Instrucciones según Método de Pago */}
                <div className="p-4 bg-zen-dorado-100/70 rounded-2xl border border-zen-dorado-300 text-left text-xs text-stone-700 leading-relaxed">
                  {metodoPago === 'bizum' ? (
                    <>
                      <p className="font-bold text-zen-bosque-900 mb-1">
                        Instrucciones de Pago por Bizum:
                      </p>
                      <p>
                        Realiza un Bizum por importe de <strong>{formatEuro(pedidoConfirmado.total)}</strong> al teléfono <strong>600 000 000</strong> indicando en el concepto el identificador <strong>{pedidoConfirmado.numeroPedido}</strong>.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-bold text-zen-bosque-900 mb-1">
                        Recogida y Pago en Tienda:
                      </p>
                      <p>
                        Te avisaremos en cuanto tu paquete esté preparado. Podrás abonarlo en efectivo o tarjeta en nuestra tienda de <strong>Rúa Principal, 42 (Boiro)</strong>.
                      </p>
                    </>
                  )}
                </div>

                {/* Botón WhatsApp de Confirmación Directa */}
                <a
                  href={`https://wa.me/34600000000?text=Hola%20Pepi,%20he%20realizado%20el%20pedido%20${pedidoConfirmado.numeroPedido}%20por%20importe%20de%20${encodeURIComponent(formatEuro(pedidoConfirmado.total))}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button
                    variant="zen"
                    size="md"
                    leftIcon={<MessageCircle className="w-4 h-4 text-emerald-300" />}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Confirmar por WhatsApp con Pepi
                  </Button>
                </a>
              </div>
            )}
          </div>

          {/* PIE DEL DRAWER (TOTALES Y ACCIONES) */}
          {items.length > 0 && paso !== 3 && (
            <div className="px-6 py-4 border-t border-stone-200/80 bg-white/80 space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal productos:</span>
                  <span>{formatEuro(total)}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Modalidad de entrega:</span>
                  <span>{costeEnvio === 0 ? 'Gratis' : formatEuro(costeEnvio)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-zen-bosque-900 pt-1 border-t border-stone-100">
                  <span>Total Pedido:</span>
                  <span className="font-serif text-lg text-zen-bosque-900">
                    {formatEuro(totalConEnvio)}
                  </span>
                </div>
              </div>

              {paso === 1 && (
                <Button
                  variant="zen"
                  size="md"
                  onClick={handlePasoSiguiente}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full"
                >
                  Tramitar Pedido
                </Button>
              )}

              {paso === 2 && (
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    onClick={() => setPaso(1)}
                    leftIcon={<ArrowLeft className="w-4 h-4" />}
                    disabled={isSubmitting}
                  >
                    Atrás
                  </Button>
                  <Button
                    form="order-form"
                    type="submit"
                    variant="zen"
                    size="md"
                    isLoading={isSubmitting}
                    className="flex-1"
                  >
                    Confirmar Pedido ({formatEuro(totalConEnvio)})
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
